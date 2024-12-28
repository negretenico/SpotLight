import logging
from datetime import datetime
from pathlib import Path

import tensorflow as tf

from dataclass.ImageDimension import ImageDimensions
from model.binaryclassifier import BinaryClassifier


def get_model_attributes():
    from dataclass.ModelAttributes import ModelAttributes
    return ModelAttributes(categories=['PASS', 'FAIL'])


def get_model_data():
    from dataclass.ImageDimension import ImageDimensions
    from dataclass.ModelDataset import ModelDataset
    model_attributes = get_model_attributes()
    image_dimensions = ImageDimensions()
    train_ds = tf.keras.utils.image_dataset_from_directory(
        "data/train",
        image_size=(image_dimensions.img_width, image_dimensions.img_height),
        batch_size=model_attributes.batch_size
    )
    test_ds = tf.keras.utils.image_dataset_from_directory(
        "data/test",
        image_size=(image_dimensions.img_width, image_dimensions.img_height),
        batch_size=model_attributes.batch_size
    )
    return ModelDataset(test_ds=test_ds, train_ds=train_ds)


def setup_logging():
    """Configure logging for the training process."""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler('training.log'),
            logging.StreamHandler()
        ]
    )


def get_class_weights(dataset):
    """Calculate class weights for imbalanced datasets."""
    total_samples = 0
    class_counts = {}

    for _, labels in dataset:
        for label in labels:
            label_idx = int(label)
            class_counts[label_idx] = class_counts.get(label_idx, 0) + 1
            total_samples += 1

    class_weights = {
        class_idx: total_samples / (len(class_counts) * count)
        for class_idx, count in class_counts.items()
    }

    return class_weights


def main():
    # Setup logging
    setup_logging()
    logging.info("Starting training process")
    # Get model data
    model_data = get_model_data()
    model_att = get_model_attributes()
    img_dim = ImageDimensions()

    # Calculate class weights
    class_weights = get_class_weights(model_data.train_ds)
    logging.info(f"Class weights: {class_weights}")
    # Create and compile model
    model = BinaryClassifier(
        input_shape=(img_dim.img_height, img_dim.img_width, img_dim.channels),
        num_classes=2,
        initial_filters=32,
        dropout_rate=0.3
    )
    model.compile_model()
    model.summary()
    try:
        # Create output directory with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_dir = Path(f"models/{timestamp}")
        output_dir.mkdir(parents=True, exist_ok=True)

        # Train model
        with tf.device('/GPU:0'):
            history = model.train(
                train_ds=model_data.train_ds,
                validation_ds=model_data.test_ds,
                epochs=model_att.epochs,
                class_weights=class_weights
            )

            # Save final model
            model.save(output_dir / "final_model.h5")
        logging.info("Training completed successfully")

    except Exception as e:
        logging.error(f"Training failed: {str(e)}", exc_info=True)
        raise


if __name__ == "__main__":
    main()
