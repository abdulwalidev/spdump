document.getElementById('uploadButton').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const previewContainer = document.getElementById('preview');
    previewContainer.innerHTML = ''; // Clear previous previews

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('preview-image');

            const img = document.createElement('img');
            img.src = e.target.result;
            imageContainer.appendChild(img);

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '×';
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = function() {
                previewContainer.removeChild(imageContainer);
            };
            imageContainer.appendChild(deleteButton);

            previewContainer.appendChild(imageContainer);
        };
        reader.readAsDataURL(file);
    });
});
