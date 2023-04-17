////////// DELIVERABLES //////////
// You are going to build a JavaScript application which searches GitHub for users by name and 
// displays the results on the screen. Clicking on a specific user will show all the 
// repositories for that user.
document.addEventListener('DOMContentLoaded', () => {

    // 1. The index.html file has a form with a search input. When the form is submitted, 
    // it should take the value of the input and search GitHub for user matches using the User Search Endpoint
    document.querySelector('#github-form').addEventListener('submit', searchUser);

    function searchUser(event) {
        event.preventDefault();
        let searchTerm = document.getElementById('search').value;
        let url = `https://api.github.com/search/users?q=${searchTerm}`;
        fetch(url)
            .then(response => response.json())

            // 2. Using the results of the search, display information about the users to the page. 
            // (You might include showing their username, avatar and a link to their profile.)                  
            .then(data => {
                const userList = document.querySelector('#user-list');
                userList.innerHTML = ''; // clear any existing user data

                // loop through user data in the response and create an element for each one
                data.items.forEach(user => {
                    const userName = document.createElement('h2');
                    const avatar = document.createElement('img');
                    const link = document.createElement('a');

                    userName.textContent = user.login;
                    userName.id = 'username';
                    avatar.src = user.avatar_url;
                    link.href = user.html_url;
                    link.textContent = 'View Profile';

                    const userContainer = document.createElement('li');
                    userContainer.appendChild(userName);
                    userContainer.appendChild(avatar);
                    userContainer.appendChild(link);

                    userList.appendChild(userContainer);
                });
            });

        // 3. Clicking on one of these users should send a request to the User Repo Endpoint
        // and return data about all the repositories for that user.
        // 4. Using the response from the Users Repos Endpoint display all the repositories 
        document.getElementById('user-list').addEventListener('click', findRepos)

        function findRepos() {

            fetch(`https://api.github.com/users/${searchTerm}/repos`)
                .then(response => response.json())
                .then(data => {
                    const reposList = document.querySelector('#repos-list');

                    data.forEach(repo => {
                        const repoName = document.createElement('h2');
                        const repoLink = document.createElement('a');

                        repoName.textContent = repo.name;
                        repoLink.href = repo.html_url;
                        repoLink.textContent = 'View Repo';

                        const repoContainer = document.createElement('li');
                        repoContainer.appendChild(repoName);
                        repoContainer.appendChild(repoLink);
                        reposList.appendChild(repoContainer);
                    })

                })

        }

    }
});