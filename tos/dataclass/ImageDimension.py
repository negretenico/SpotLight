from dataclasses import dataclass


@dataclass
class ImageDimensions:
    """
    Represents the dimensiosn of an aimage
        img_height (int): The height of the input images. Default is 120.
        img_width (int): The width of the input images. Default is 120.
        channels (int): Dimensions of image. Default is 3 RGB
    """
    img_height: int = 120
    img_width: int = 120
    channels: int = 3
