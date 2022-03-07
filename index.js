function loadModal(modalElement, contentElement, projectId) {
    const url = `./projects/${projectId}.html`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        console.log(this);
        if (this.readyState !== 4) return;
        if (this.status !== 200) {
            alert("Could load page for modal: " + url);
            return;
        }

        // contentElement.innerHTML = this.responseText;
        modalElement.classList.add("show");
    }
    xhr.send();
}

function onLoad() {
    const projectModal = document.getElementById("project-modal");
    const projectContent = document.getElementById("project-modal-content");
    const projectItems = document.getElementsByClassName("project-row");

    // initialise click handlers
    for (var i = 0; i < projectItems.length; i++) {
        const projectItem = projectItems[i];
        projectItem.onclick = () => {
            loadModal(projectModal, projectContent, projectItem.dataset.project);
        }
    }

    document.getElementById("project-modal-close").onclick = function () {
        projectModal.classList.remove("show");
    }

    // debug -
    loadModal(projectModal, projectContent, "2022-awesome-quotes");
}

window.onload = onLoad;