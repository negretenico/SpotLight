import os
import shutil

from sklearn.model_selection import train_test_split

# Define source and target directories
source_dir = "data/not"  # Original directory with categories
train_dir = "data/train/not_sports"  # Target directory for training data
test_dir = "data/test/not_sports"  # Target directory for testing data

# Create target directories if they don't exist
os.makedirs(train_dir, exist_ok=True)
os.makedirs(test_dir, exist_ok=True)

# Open log file to track the split
log_file = open("data_split_log.txt", "w")

# Loop through each category under the source directory
for category in os.listdir(source_dir):
    try:
        category_path = os.path.join(source_dir, category)
        img_dir = os.path.join(category_path, "img")  # Path to the `img` subdirectory
        if not os.path.isdir(img_dir):
            continue  # Skip if the `img` subdirectory doesn't exist

        # List all image files in the `img` subdirectory
        images = [
            os.path.join(img_dir, img)
            for img in os.listdir(img_dir)
            if img.endswith(('.jpg', '.png', '.jpeg'))
        ]

        # Split into train and test sets (e.g., 80% train, 20% test)
        train_images, test_images = train_test_split(images, test_size=0.2, random_state=42)

        # Move files to the respective train/test directories
        for idx, img in enumerate(train_images):
            try:
                new_name = f"not_sports_{category}_{idx:03d}_{os.path.basename(img)}"
                shutil.move(img, os.path.join(train_dir, new_name))
            except Exception as e:
                print(f"Error moving train image {img}: {e}")

        for idx, img in enumerate(test_images):
            try:
                new_name = f"not_sports_{category}_{idx:03d}_{os.path.basename(img)}"
                shutil.move(img, os.path.join(test_dir, new_name))
            except Exception as e:
                print(f"Error moving test image {img}: {e}")

        # Log the processed category
        log_file.write(f"Category: {category}, Train: {len(train_images)}, Test: {len(test_images)}\n")
        print(f"Processed category: {category}. Train: {len(train_images)}, Test: {len(test_images)}")

    except Exception as e:
        print(f"Error processing category {category}: {e}")

# Cleanup: Remove empty category directories in the source
for category in os.listdir(source_dir):
    try:
        category_path = os.path.join(source_dir, category, "img")  # Check the `img` subdirectory
        if os.path.isdir(category_path) and not os.listdir(category_path):
            os.rmdir(category_path)  # Remove the empty `img` subdirectory
            os.rmdir(os.path.join(source_dir, category))  # Remove the empty category directory
    except Exception as e:
        print(f"Error removing directory {category_path}: {e}")

log_file.close()
print("Data splitting complete.")
