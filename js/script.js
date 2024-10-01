

let SiteName = document.getElementById('SiteName');
let SiteURL = document.getElementById('SiteURL');
let alertName = document.getElementById('alertName');

let SiteNameContainer;

if (localStorage.getItem("mySite") != null) {
    SiteNameContainer = JSON.parse(localStorage.getItem("mySite"));
    displaySite();
} else {
    SiteNameContainer = [];
}

function add() {
    if (validateSiteURL() === true && SiteName.value.trim() !== "") {
        let site = {
            name: SiteName.value,
            url: SiteURL.value 
        };

        SiteNameContainer.push(site);
        localStorage.setItem("mySite", JSON.stringify(SiteNameContainer));
        displaySite();
        clear();
    } else {
        window.alert('Check the inputs. Please make sure the site name and URL are valid.');
    }
}

function clear() {
    SiteName.value = "";
    SiteURL.value = ""; 
}

function displaySite() {
    let showData = "";
    for (let i = 0; i < SiteNameContainer.length; i++) {
        showData += `
        <tr>
           <td>${i + 1}</td>
           <td>${SiteNameContainer[i].name}</td>
           <td class="ps-5"><button class="btn btn-outline-primary" onclick="visitURL('${SiteNameContainer[i].url}')">Visit</button></td>
           <td><button class="btn btn-outline-danger" onclick="deleteSite(${i})">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tableData').innerHTML = showData;
}

function deleteSite(index) {
    SiteNameContainer.splice(index, 1);
    localStorage.setItem("mySite", JSON.stringify(SiteNameContainer));
    displaySite();
}

function validateSiteURL() {
    let regx = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-])\/?$/;
        if (regx.test(SiteURL.value) === true) {
        SiteURL.classList.remove('is-invalid');
        alertName.classList.add('d-none');
        alertName.classList.remove('d-block');
        SiteURL.classList.add('is-valid');
        return true;
    } else {
        SiteURL.classList.remove('is-valid');
        SiteURL.classList.add('is-invalid');
        alertName.classList.add('d-block');
        alertName.classList.remove('d-none');
        return false;
    }
}

SiteURL.addEventListener('blur', validateSiteURL);

function visitURL(url) {
    if (url) {
        if (!url.startsWith('http')) {
            url = 'http://' + url;
        }
        window.open(url, "_blank");
    }
}
