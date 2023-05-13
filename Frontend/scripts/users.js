$(function () {
    $("nav").load("navbar.html")
})
$(function () {
    $("footer").load("footer.html")
})
let container = document.querySelector(".users-container")

fetch('https://zany-jade-kingfisher-ring.cyclic.app/app/employees', {
    method: "GET",
    headers: {
        "Content-type": "application/json"
    },
})
    .then(res => res.json())
    .then(data => {
        console.log(data);

        const table = document.createElement("table");

        const headers = ["Name", "Email", "Role", "ID", "Actions"];
        const headerRow = document.createElement("tr");
        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);

        data.forEach(e => {
            const tr = document.createElement("tr");

            const name = document.createElement("td");
            name.textContent = e.name;
            tr.appendChild(name);

            const email = document.createElement("td");
            email.textContent = e.email;
            tr.appendChild(email);

            const role = document.createElement("td");
            role.textContent = e.role;
            tr.appendChild(role);

            const id = document.createElement("td");
            id.setAttribute("id", "userID")
            id.textContent = e._id;
            tr.appendChild(id);

            const actions = document.createElement("td");
            const dltBtn = document.createElement("button");
            dltBtn.setAttribute("id", "dltUser");
            dltBtn.textContent = "Remove";
            // dltBtn.setAttribute("onclick","deleteUser()")
            dltBtn.addEventListener("click", async () => {
                const userID = e._id
                fetch(`https://zany-jade-kingfisher-ring.cyclic.app/app/deleteUser/${userID}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.msg === "user is deleted") {
                            const popup = document.querySelector('.popup');
                            popup.style.display = "block";

                            setTimeout(() => {
                                popup.style.display = "none";
                            }, 3000);
                        }
                    })
                    .catch(err => console.log(err))
            })
            actions.appendChild(dltBtn);
            tr.appendChild(actions);

            table.appendChild(tr);
        });
        container.appendChild(table);

        if (data.msg === 'user is deleted') {
            const popup = document.querySelector('.popup');
            popup.style.display = "block";

            setTimeout(() => {
                popup.style.display = "none";
            }, 3000);
        }
    })
    .catch(err => {
        console.error({ "msg": "something went wrong", "error": err.message });
    });