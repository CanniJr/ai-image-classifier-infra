import torch
from torchvision import models, transforms
from PIL import Image
import ast

#load labels from a file
with open('imagenet_classes.txt') as f:
    labels = ast.literal_eval(f.read())

model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
model.eval()

transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
])

def predict(image_path):
    image = Image.open(image_path).convert("RGB")
    input_tensor = transform(image).unsqueeze(0)  # Add batch dimension

    with torch.no_grad():
        outputs = model(input_tensor)
        _, predicted = torch.max(outputs, 1)
        class_id = predicted.item()
        class_label = labels.get(class_id, f"Unknown class ID: {class_id}")
        

    return {"id" :class_id, "label": class_label}