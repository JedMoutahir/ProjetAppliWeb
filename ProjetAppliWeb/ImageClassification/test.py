import cv2
import numpy as np
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input, decode_predictions
from tensorflow.keras.preprocessing import image

# Load the pretrained ResNet50 model
model = ResNet50(weights='imagenet')

# Set up the camera
cap = cv2.VideoCapture(0)

# Run the main loop
while True:
    # Capture a frame from the camera
    ret, frame = cap.read()

    # Resize the frame to 224x224
    img = cv2.resize(frame, (224, 224))

    # Convert the frame to an image and preprocess it for ResNet50
    img = image.img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = preprocess_input(img)

    # Make a prediction with ResNet50
    predictions = model.predict(img)

    # Decode the predictions
    label = decode_predictions(predictions, top=1)[0][0][1]

    # Print the label on the frame
    cv2.putText(frame, f"Label: {label}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    # Show the frame
    cv2.imshow("Camera", frame)

    # Exit if the 'q' key is pressed
    if cv2.waitKey(1) == ord('q'):
        break

# Clean up
cap.release()
cv2.destroyAllWindows()
