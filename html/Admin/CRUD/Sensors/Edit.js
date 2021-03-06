DromMenuForEdit();
async function DromMenuForEdit() {

    idSensor = takeCookie("idSensorFor");
    response = await apiFetch('Sensors/' + idSensor, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + takeCookie("JWT"),
            'Content-Type': 'application/json;charset=utf-8'
        },
    });
    sensor = (await response.json());


    users = await queryForUsers();
    let user = "";
    for (let i = 0; i < users.length; i++) {
        if (sensor.userId == users[i].userId) {
            user = users[i].firstName;
        }
    }
    document.getElementById('NameSensorU').value = sensor.nameSensor;
    document.getElementById('XU').value = sensor.x;
    document.getElementById('YU').value = sensor.y;
    document.getElementById('dropdownMenuButtonU').innerText = user;

    sensorMenu = document.getElementById('dropMenuCreateU');
    for (let i = 0; i < users.length; i++) {

        let a_Menu = document.createElement('a');
        a_Menu.innerText = users[i].firstName;
        a_Menu.href = "#";
        a_Menu.addEventListener("click", function() {
            document.getElementById('dropdownMenuButtonU').innerText = users[i].firstName;
        }, false);
        a_Menu.classList.add("dropdown-item");
        sensorMenu.appendChild(a_Menu);
    }
}


async function EditSensor() {
    _user = document.getElementById('dropdownMenuButtonU').innerText;
    _NameSensor = document.getElementById('NameSensorU').value;
    _X = document.getElementById('XU').value;
    _Y = document.getElementById('YU').value;

    users = await queryForUsers();

    let userId = "";
    for (let i = 0; i < users.length; i++) {
        if (_user == users[i].firstName) {
            userId = users[i].userId;
        }
    }
    var data = {
        SensorId: takeCookie("idSensorFor"),
        NameSensor: _NameSensor,
        UserId: userId,
        X: _X,
        Y: _Y
    };

    console.log(JSON.stringify(data));
    response = await apiFetch('Sensors', {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + takeCookie("JWT"),
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    location.href = "Index.html";
}

async function queryForUsers() {
    response = await apiFetch('Users', {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + takeCookie("JWT"),
            'Content-Type': 'application/json;charset=utf-8'
        },
    });
    users = (await response.json());
    return users;
}