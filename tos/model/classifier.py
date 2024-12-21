import tensorflow as tf
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dropout, Flatten, Dense


class Classifier:
    def __init__(self, input_shape, num_classes, data_augmentation=None):
        self.model = Sequential()

        # Add data augmentation layer if provided
        if data_augmentation:
            self.model.add(data_augmentation)

        # Add layers to the model
        self.model.add(Conv2D(16, 3, padding='same', activation='relu', input_shape=input_shape))
        self.model.add(Conv2D(16, 3, padding='same', activation='relu'))
        self.model.add(MaxPooling2D())
        self.model.add(Dropout(0.2))

        self.model.add(Conv2D(32, 3, padding='same', activation='relu'))
        self.model.add(MaxPooling2D())
        self.model.add(Dropout(0.2))

        self.model.add(Conv2D(64, 3, padding='same', activation='relu'))
        self.model.add(MaxPooling2D())
        self.model.add(Dropout(0.2))

        self.model.add(Flatten())
        self.model.add(Dense(128, activation='relu'))
        self.model.add(Dense(num_classes))

    def compile_model(self, optimizer='adam', loss=None, metrics=None):
        if loss is None:
            loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
        if metrics is None:
            metrics = ['accuracy']
        self.model.compile(optimizer=optimizer, loss=loss, metrics=metrics)

    def summarize(self):
        self.model.summary()
