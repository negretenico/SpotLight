from dataclasses import dataclass


@dataclass
class ModelDataset:
    """
    Represents the dataset configurations for training and testing.

    Attributes:
        train_ds (list): The training dataset.
        test_ds (list): The testing dataset.

    """
    train_ds: list
    test_ds: list
