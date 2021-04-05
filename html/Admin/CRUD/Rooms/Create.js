async function CreateNewRoom() {
    _company = document.getElementById('dropdownMenuButton').innerText;
    _nameRoom = document.getElementById('NameRoom').value;
    _CoordinatesRoom = document.getElementById('CoordinatesRoom').value;

    companies = await queryForCompanies();

    let compId = "";
    for (let i = 0; i < companies.length; i++) {
        if (_company == companies[i].nameCompany) {
            compId = companies[i].companyId;
        }
    }
    var data = {
        NameRoom: _nameRoom,
        CompanyId: compId,
        CoordinatesRoom: _CoordinatesRoom
    };

    console.log(JSON.stringify(data));
    response = await fetch('http://localhost:5000/api/Rooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    response = (await response.json());
    location.href = "Index.html";
}

async function queryForCompanies() {
    response = await fetch('http://localhost:5000/api/Companies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    });
    Compies = (await response.json());
    return Compies;
}

DromMenuForCreate();
async function DromMenuForCreate() {
    companies = await queryForCompanies();
    companyMenu = document.getElementById('dropMenuCreate');
    for (let i = 0; i < companies.length; i++) {

        let a_Menu = document.createElement('a');
        a_Menu.innerText = companies[i].nameCompany;
        a_Menu.href = "#";
        a_Menu.addEventListener("click", function () {
            document.getElementById('dropdownMenuButton').innerText = companies[i].nameCompany;
        }
            , false);
        a_Menu.classList.add("dropdown-item");
        companyMenu.appendChild(a_Menu);
    }
}

