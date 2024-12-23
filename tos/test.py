import os

import cv2
import numpy as np

from model.binaryclassifier import BinaryClassifier


def preprocess_image(non_formated_image):
    """Preprocess a single image for model prediction"""
    # Resize image
    local_image = cv2.resize(non_formated_image, (120, 120))

    # Normalize pixel values
    local_image = local_image.astype(np.float32) / 255.0

    # Add batch dimension
    return np.expand_dims(local_image, axis=0)


def predict_image(input_image, local_model):
    """Make prediction on a single image"""
    processed_image = preprocess_image(input_image)
    prediction = local_model.predict(processed_image)
    # Get predicted class and confidence
    predicted_class = int(np.argmax(prediction[0]))
    confidence = float(prediction[0][predicted_class])

    return {
        "predicted_class": "PASS" if predicted_class == 0 else "FAIL",
        "confidence": confidence
    }


if __name__ == "__main__":
    model = BinaryClassifier(
        input_shape=(120, 120, 3),
        num_classes=2,
        initial_filters=32,
        dropout_rate=0.3
    )
    model.load('./models/20241223_102322/final_model.h5')
    for img in os.listdir('./data/live'):
        img_path = os.path.join('./data/live', img)
        try:
            image = cv2.imread(str(img_path))
            result = predict_image(image, model)
            print(f"Prediction for {img} is {result['predicted_class']} with confidence {result['confidence']}")
        except Exception as e:
            print(e)
            pass
