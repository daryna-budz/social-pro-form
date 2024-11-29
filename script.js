const startButton = document.getElementById("main-btn");
const mainPage = document.querySelector(".main-container");
const formContainers = document.querySelectorAll(".form-container");
const nextButtons = document.querySelectorAll("#next-btn");
const searchInput = document.getElementById('search-input');
const dropdownList = document.getElementById('dropdown-list');
const selectedTagsContainer = document.getElementById('selected-tags');

let selectedTags = [];
let currentFormIndex = 0;

// Function to show a specific form based on the index
function showForm(index) {
    formContainers.forEach((form, i) => {
        if (i === index) {
            form.classList.remove('hidden');
            form.classList.add('visible');
        } else {
            form.classList.add('hidden');
            form.classList.remove('visible');
        }
    });
}

// Handle Start Button
startButton.addEventListener('click', function () {
    mainPage.classList.add("hidden");
    setTimeout(() => {
        showForm(currentFormIndex);
        document.body.style.background = "linear-gradient(to right, #000000, #040952)";
    }, 200);
});

// Handle "Next" button clicks
nextButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (currentFormIndex < formContainers.length - 1) {
            currentFormIndex++;
            showForm(currentFormIndex);
        }
    });
});

// Dropdown functionality
searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    const items = dropdownList.querySelectorAll('li');

    dropdownList.style.display = query ? 'block' : 'none';

    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'block' : 'none';
    });
});

dropdownList.addEventListener('click', function (event) {
    const tag = event.target.textContent;

    // Add tag to the selected tags if not already selected
    if (!selectedTags.includes(tag)) {
        selectedTags.push(tag);
        renderSelectedTags();
    }

    // Clear the search input
    searchInput.value = '';
    dropdownList.style.display = 'none';
});

selectedTagsContainer.addEventListener('click', function (event) {
    const tagToRemove = event.target.textContent;
    if (event.target.tagName === 'SPAN') {
        selectedTags = selectedTags.filter(tag => tag !== tagToRemove);
        renderSelectedTags();
    }
});

function renderSelectedTags() {
    selectedTagsContainer.innerHTML = ''; // Clear previous selected tags
    selectedTags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.textContent = tag;
        selectedTagsContainer.appendChild(tagElement);
    });
}

// Close the dropdown if clicked outside
document.addEventListener('click', function (event) {
    if (!dropdownList.contains(event.target) && event.target !== searchInput) {
        dropdownList.style.display = 'none';
    }
});



