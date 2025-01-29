let lastRequestTime = 0;

function getServerStat() {
    let currentTime = Date.now();
    if (currentTime - lastRequestTime < 3000) {
        alert("Please wait at least 3 seconds before checking again.");
        return;
    }
    lastRequestTime = currentTime;

    let serverAddress = document.getElementById("input-server").value;
    axios.get("https://mcstat.pma10.workers.dev/api/" + serverAddress).then(response => {
        if (response.status !== 200) {
            alert("Address is invalid");
            return;
        }
        if (!response.data.errno) {
            document.getElementById("server-info-container").classList.remove("hidden");
            document.getElementById("server-status").innerHTML = response.data.online 
                ? "Server is online" 
                : "Server is offline";

            document.getElementById("server-address").innerHTML = serverAddress;
            document.getElementById("server-online").innerHTML = 
                `${response.data.players.online}/${response.data.players.max}`;
            document.getElementById("server-version").innerHTML = response.data.version.name;
            document.getElementById("server-ip").innerHTML = 
                `${response.data.srv.host}:${response.data.srv.port}`;
        } else {
            document.getElementById("server-info-container").classList.add("hidden");
            alert("Server is not online or the address is invalid");
        }
    }).catch(error => {
        alert("Address is invalid");
    });
}
