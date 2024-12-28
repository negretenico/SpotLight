import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dropout, Flatten, Dense, BatchNormalization


class BinaryClassifier:
    """A CNN-based binary classifier"""

    def __init__(self, input_shape,
                 num_classes=2,
                 data_augmentation=None,
                 initial_filters=32,
                 dropout_rate=0.3):
        self.model = self.__build_model__(
            input_shape,
            num_classes,
            initial_filters,
            dropout_rate
        )

    def __build_model__(self, input_shape, num_classes, initial_filters, dropout_rate):
        model = Sequential()

        # First conv block
        model.add(Conv2D(initial_filters, 3, padding='same', activation='relu',
                         input_shape=input_shape))
        model.add(BatchNormalization())
        model.add(Conv2D(initial_filters, 3, padding='same', activation='relu'))
        model.add(BatchNormalization())
        model.add(MaxPooling2D())
        model.add(Dropout(dropout_rate))

        # Second conv block
        model.add(Conv2D(initial_filters * 2, 3, padding='same', activation='relu'))
        model.add(BatchNormalization())
        model.add(MaxPooling2D())
        model.add(Dropout(dropout_rate))

        # Third conv block
        model.add(Conv2D(initial_filters * 4, 3, padding='same', activation='relu'))
        model.add(BatchNormalization())
        model.add(MaxPooling2D())
        model.add(Dropout(dropout_rate))

        # Dense layers
        model.add(Flatten())
        model.add(Dense(256, activation='relu'))
        model.add(BatchNormalization())
        model.add(Dropout(dropout_rate))
        model.add(Dense(num_classes, activation='softmax'))
        return model

    def compile_model(
            self,
            optimizer=None,
            loss='sparse_categorical_crossentropy',
            metrics=None,
            learning_rate=1.0e-3
    ):
        """Compile the model with specified parameters."""
        if metrics is None:
            metrics = ['accuracy']
        if optimizer is None:
            optimizer = tf.keras.optimizers.Adam(learning_rate=learning_rate)
        self.model.compile(
            optimizer=optimizer,
            loss=loss,
            metrics=metrics
        )

    def summary(self):
        """Print model architecture summary."""
        self.model.summary()

    def train(self, train_ds=None, validation_ds=None, epochs=200, class_weights=None):
        """Train the model"""
        return self.model.fit(
            train_ds,
            validation_data=validation_ds,
            epochs=epochs,
            class_weight=class_weights
        )

    def save(self, file_path='saved_model/model1'):
        """Save a model to disk"""
        self.model.save(file_path)

    def load(self, filepath):
        """Load a saved model from disk."""
        self.model = tf.keras.models.load_model(filepath)

    def predict(self, data, batch_size=None):
        """Make predictions on new data."""
        return self.model.predict(data, batch_size=batch_size)
