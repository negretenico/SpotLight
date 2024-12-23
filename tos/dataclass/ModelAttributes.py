from dataclasses import dataclass
from typing import List


@dataclass
class ModelAttributes:
    """
    Defines training attributes that are independent of the dataset.

    Attributes:
        categories (List[str]): The list of target categories for classification.
        batch_size (int): The number of samples per batch. Default is 5.
        epochs (int): The number of training epochs. Default is 200.
        learning_rate (float): The initial learning rate for the optimizer. Default is 0.001.
        save_path (str): The file path where the model will be saved. Default is '/saved_model/model_v1'.
    """

    categories: List[str]
    batch_size: int = 64
    epochs: int = 2
    learning_rate: float = 1.0e-2
    save_path: str = '/saved_model/model_v1'

    def __post_init__(self):
        assert self.batch_size > 0, "Batch size must be positive."
        assert self.epochs > 0, "Epochs must be positive."
        assert 0 < self.learning_rate <= 1, "Learning rate must be between 0 and 1."
