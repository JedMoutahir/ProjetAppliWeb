from transformers import YolosFeatureExtractor, YolosForObjectDetection
from PIL import Image
import requests
import matplotlib.pyplot as plt
url = 'http://images.cocodataset.org/val2017/000000039769.jpg'
image = Image.open(requests.get(url, stream=True).raw)

feature_extractor = YolosFeatureExtractor.from_pretrained('hustvl/yolos-small')
model = YolosForObjectDetection.from_pretrained('hustvl/yolos-small')

inputs = feature_extractor(images=image, return_tensors="pt")
outputs = model(**inputs)

# model predicts bounding boxes and corresponding COCO classes
logits = outputs.logits
bboxes = outputs.pred_boxes

# show results
fig, ax = plt.subplots(1, figsize=(16, 8))
ax.imshow(image)
for bbox, class_idx in zip(bboxes[0], logits[0].argmax(-1)):
    if class_idx == 0:  # skip background
        continue
    ax.add_patch(bbox.to_bbox())
    ax.text(bbox[0], bbox[1], feature_extractor.coco_labels[class_idx], fontsize=15, color='white',
            bbox=dict(facecolor='blue', alpha=0.5))
plt.axis('off')
plt.show()