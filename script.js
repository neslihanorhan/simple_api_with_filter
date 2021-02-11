async function getUsers() {
    var url = `https://randomuser.me/api/?results=50`;
    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson.results;
}

const UIModule = (function() {
    const Elements = {
        result: document.getElementById("result"),
        filter: document.getElementById("filter"),
        userList: []
    }
    return {
        getElements: function() {
            return Elements;
        },
        createPage: function() {
            getUsers().then(users => {
                Elements.result.innerHTML = "";
                users.forEach(user => {
                    const li = document.createElement("li");
                    Elements.userList.push(li);
                    li.innerHTML = `<img src="${user.picture.large}" alt="${user.name.first}">
                                <div class="user-info">
                                    <h4>${user.name.first} ${user.name.last}</h4>
                                    <p>${user.location.city}, ${user.location.country}</p>
                                </div>`;
                    Elements.result.appendChild(li);
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }
})();

const FilterModule = (function(UIProp) {
    const UIElements = UIProp.getElements();
        return {
        filterUser: function(searchTerm) {
            UIElements.userList.forEach(item => {
                if (item.children[1].children[0].innerText.toLowerCase().includes(searchTerm.target.value.toLowerCase())) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }
            })
        }
    }
})(UIModule);

const AppModule = (function(UIProp, FilterProp) {
    const UIElements = UIProp.getElements();
    // console.log(UIElements);
    const setListeners = function() {
        window.addEventListener("load", UIProp.createPage);
        UIElements.filter.addEventListener("input", FilterProp.filterUser);
        // UIElements.filter.addEventListener("input", (event) => {
        //  FilterProp.filterUser(event)
        // });
    }
    return {
        showUsers: function() {
            setListeners();
        }
    }
})(UIModule,FilterModule);

AppModule.showUsers();

// ********* daha uygun

// const result = document.getElementById("result");
// const filter = document.getElementById("filter");
// const listItems = [];

// function getUsers() {
//     fetch(`https://randomuser.me/api/?results=50`)
//         .then(res => {
//             return res.json();
//         }).then(users => {
//             // console.log(users);
//             // console.log(users.results);
//             result.innerHTML = "";  // hesaplar gelince Loading... silinsin diye
//             users.results.forEach(user => {
//                 const li = document.createElement("li");    // her bir hesabın gözükeceği li
//                 listItems.push(li); // oluşan her bir li bu array'e push'lanıyor.
//                 li.innerHTML = `<img src="${user.picture.large}" alt="${user.name.first}">
//                                 <div class="user-info">
//                                     <h4>${user.name.first} ${user.name.last}</h4>
//                                     <p>${user.location.city}, ${user.location.country}</p>
//                                 </div>`;
//                 result.appendChild(li); // yukarıda yapısı oluşturulan li result'a ekleniyor.
//             });
//             // console.log(listItems);
//         });
// }
// getUsers();

// function filterUser(searchTerm) {
//     listItems.forEach(item => {
// 		if(item.children[1].children[0].innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
//         // if(item.innerText.toLowerCase().includes(searchTerm.toLowerCase())) {
//             item.classList.remove("hide");
//         } else {
//             item.classList.add("hide");
//         }
//     });
// }

// filter.addEventListener("input", (event) => {
//     filterUser(event.target.value);
//     // console.log(event.target.value);
// })


// ********* daha maliyetli

// const result = document.getElementById("result");
// const filter = document.getElementById("filter");
// var users = [];
// var listUsers = [];

// async function getUsers() {
//     var url = `https://randomuser.me/api/?results=50`;
//     const usersResponse = await fetch(url);
//     const usersJson = await usersResponse.json();
//     // console.log(usersJson);
//     return usersJson.results;
// }

// window.addEventListener("load", () => {
//     getUsers()
//         .then(res => {
//             // console.log(res);
//             users = res;
//             setListeners();
//         })
// });

// function showUsers(users) {
//     var html = "";
//     result.innerHTML = "";
//     users.forEach(user => {
//         html += `
//             <li>
//                 <img src="${user.picture.large}" alt="${user.name.first}">
//                 <div class="user-info">
//                     <h4>${user.name.first} ${user.name.last}</h4>
//                     <p>${user.location.city}, ${user.location.country}</p>
//                 </div>
//             </li>`;
//         result.innerHTML = html;
//     });
// }

// function setListeners() {
//     showUsers(users);
//     filter.addEventListener("input", () => {
//         // console.log("input fire");
//         var searchTerm = filter.value;
//         listUsers = []; // inputa girilen her bir value'dan önce listUsers boşaltılıyor.
//         users.forEach(user => { // globalde tanımlanan users yani res
//             if (user.name.first.toLowerCase().includes(searchTerm.toLowerCase())) {
//                 listUsers.push(user);
//             }
//             showUsers(listUsers);
//         });
//     });
// }