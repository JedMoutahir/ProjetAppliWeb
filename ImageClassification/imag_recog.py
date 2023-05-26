from transformers import DetrImageProcessor, DetrForObjectDetection
import torch
from PIL import Image
import requests


processor = DetrImageProcessor.from_pretrained("facebook/detr-resnet-101")
model = DetrForObjectDetection.from_pretrained("facebook/detr-resnet-101")
    

def label_image(image):
    # Renovie un string avec les tags de l'image
    # image = Image.open("parc.jpeg")
    inputs = processor(images=image, return_tensors="pt")
    outputs = model(**inputs)

    # let's only keep detections with score > 0.9
    target_sizes = torch.tensor([image.size[::-1]])
    results = processor.post_process_object_detection(outputs, target_sizes=target_sizes, threshold=0.99)[0]

    # Print the tags
    tags = []
    for score, label, box in zip(results["scores"], results["labels"], results["boxes"]):
        # if the tag is not in the list, add it
        if model.config.id2label[label.item()] not in tags:
                tags.append(model.config.id2label[label.item()])

    return tags


# # load paysage image from the folder bank_images
# image = Image.open("bank_images/parc.jpeg")

# print(label_image(image))

# processor = DetrImageProcessor.from_pretrained("facebook/detr-resnet-101")
# model = DetrForObjectDetection.from_pretrained("facebook/detr-resnet-101")

# inputs = processor(images=image, return_tensors="pt")
# outputs = model(**inputs)

# # convert outputs (bounding boxes and class logits) to COCO API
# # let's only keep detections with score > 0.9
# target_sizes = torch.tensor([image.size[::-1]])
# results = processor.post_process_object_detection(outputs, target_sizes=target_sizes, threshold=0.99)[0]

# for score, label, box in zip(results["scores"], results["labels"], results["boxes"]):
#     box = [round(i, 2) for i in box.tolist()]
#     print(
#             f"Detected {model.config.id2label[label.item()]} with confidence "
#             f"{round(score.item(), 3)} at location {box}"
#     )

# # show image with boxes

# image = image.convert("RGB")
# from matplotlib import pyplot as plt
# import numpy as np

# plt.imshow(np.asarray(image))
# ax = plt.gca()

# for box in results["boxes"]:
#     xmin, ymin, xmax, ymax = box.tolist()
#     width, height = xmax - xmin, ymax - ymin
#     rect = plt.Rectangle((xmin, ymin), width, height, fill=False, color="red")
#     ax.add_patch(rect)

# plt.show()