let projectModal;
let projectContent;
let projectItems;

window.onload = onLoad;

function onLoad() {
    projectModal = document.getElementById("project-modal");
    projectContent = document.getElementById("project-modal-content");
    projectItems = document.getElementsByClassName("project-row");

    // initialise click handlers
    for (var i = 0; i < projectItems.length; i++) {
        const projectItem = projectItems[i];
        projectItem.onclick = () => {
            loadModal(projectModal, projectContent, projectItem, projectItem.dataset.project);
        }
    }

    document.getElementById("project-modal-close").onclick = function () {
        projectModal.classList.remove("show");
        resetProjectItems();
    }

    // debug -
    loadModal(projectModal, projectContent, "2022-awesome-quotes");
}

function loadModal(modalElement, contentElement, projectLinkItem, projectId) {
    const url = `./projects/${projectId}.html`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status !== 200) {
            console.error("Could load page for modal: " + url);
            return;
        }
        contentElement.innerHTML = this.responseText;
        
        resetProjectItems();
        projectLinkItem.classList.add("selected");
        modalElement.classList.add("show");
    }
    xhr.send();
}

function resetProjectItems() {
    for (var i = 0; i < projectItems.length; i++) {
        projectItems[i].classList.remove("selected");
    }
}
