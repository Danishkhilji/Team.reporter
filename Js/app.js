//Add user data
const users = [];
const adduser = (ev) => {
    ev.preventDefault();
    function User(name, email, password) {
        this.name = name
        this.email = email
        this.password = password
    }
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('newPassword').value;
    const data = JSON.parse(localStorage.getItem('UsersData'));

    if (name == "" || email == "" || password == "") {
        alert("Please fill form correctly");
        console.log(email, name, password)
    }
    else {
        // check if data on database is null or not
        if (data !== null) {
            //check if email is already registered or not
            for (const i = 0; i < data.length; i++) {
                if (email == data[i].email) {
                    alert("This email is already registered");
                    break;
                }
                else {
                    users.push(new User(name, email, password));
                     localStorage.setItem("login", "");
                    //saving to localStorage
                    localStorage.setItem('UsersData', JSON.stringify(users));
                    alert("Your Account Successfully Created")
                    break;
                }
            }
        }
        else {
            users.push(new User(name, email, password));
            localStorage.setItem("login", "");
            //saving to localStorage
            localStorage.setItem('UsersData', JSON.stringify(users));
            alert("Your Account Successfully Created")
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn').addEventListener('click', adduser);

});



// PopUp form submition
const NewTeam = (ev) => {
    function Team(Tid, name, select, owner, members, memberName) {
        this.Tid = Tid
        this.name = name
        this.select = select
        this.owner = owner
        this.members = members
        this.memberName = memberName
    }

    const data = JSON.parse(localStorage.getItem("UsersData"));
    const email = document.getElementById("pemail").value;

    for (var i = 0; i < data.length; i++) {
        if (email == data[i].email) {
            var memberEmail = data[i].email
            var memberName = data[i].name
            break;
        }
    }

    if (email == memberEmail) {
        const Tid = new Date().valueOf()
        const teams = JSON.parse(localStorage.getItem("Team Data")) || [];
        const members = [];
        const name = document.getElementById('pname').value;
        const select = document.getElementById('pselect').value;
        members.push(email)
        teams.push(new Team(Tid, name, select, localStorage.getItem('teamOwner'), members, memberName));
        document.getElementById('myModal').style.display = "none";
        localStorage.setItem('Team Data', JSON.stringify(teams));
        document.querySelector("form").reset();


        // Print Team Details
        const newDiv = document.createElement("div");
        const parent = document.getElementById("myTeams");
        parent.appendChild(newDiv);
        newDiv.className = "printData"
        DivId = Tid;
        newDiv.id = DivId;
        var output = document.getElementById(DivId);
        output.innerHTML += ` <h3> ${select}</h3><br> <lable>Members:</lable> ${name}`;
        newDiv.onclick = () => {
            const owner = JSON.parse(localStorage.getItem("Team Data")) || [];
            const divId = newDiv.id
            for (k = 0; k < owner.length; k++) {
                if (divId == owner[k].Tid) {
                    localStorage.setItem("memberName", owner[k].memberName);
                }
            }
            const MN = memberName;
            localStorage.setItem("Tdetails", divId);
            window.location.href = "./teamOwnerView.html"
        }
        ev.preventDefault();

    }
    else {
        alert('member not exist')
    }
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btnadd').addEventListener('click', NewTeam);
});



// // When page load teamsView
const pageDetails = () => {

    var owner = JSON.parse(localStorage.getItem("Team Data")) || [];
    const teamOwner = localStorage.getItem("teamOwner");

    for (i = 0; i < owner.length; i++) {
        if (teamOwner == owner[i].owner) {
            const newDiv = document.createElement("div");
            const br = document.createElement("br");
            const parent = document.getElementById("myTeams");
            const memberName = owner[i].memberName
            parent.appendChild(newDiv);
            newDiv.className = "printData"
            DivId = owner[i].Tid;
            newDiv.id = DivId;
            var output = document.getElementById(DivId);
            output.innerHTML += `    <h3> ${owner[i].select}</h3><br> <lable>Members:</lable> ${owner[i].memberName} <br>`;

            newDiv.onclick = () => {
                const divId = newDiv.id
                for (k = 0; k < owner.length; k++) {
                    if (divId == owner[k].Tid) {
                        localStorage.setItem("memberName", owner[k].memberName);
                    }
                }
                const MN = memberName;
                localStorage.setItem("Tdetails", divId);
                window.location.href = "./teamOwnerView.html"
            }

        }

    }

    for (i = 0; i < owner.length; i++) {
        if (teamOwner !== owner[i].owner) {
            const loginEmail = localStorage.getItem("LoginEmail");
            for (i = 0; i < owner.length; i++) {
                if (loginEmail == owner[i].members) {
                    const newDiv = document.createElement("div");
                    const parent = document.getElementById("teamMember");
                    parent.appendChild(newDiv);
                    newDiv.className = "printData"
                    DivId = owner[i].Tid;
                    newDiv.id = DivId;
                    var output = document.getElementById(DivId);
                    output.innerHTML += `<h3> ${owner[i].select}</h3><br> <lable>Members:</lable> ${owner[i].memberName}`;
                    newDiv.onclick = () => {
                        const divId = newDiv.id
                        localStorage.setItem("Tdetails", divId);
                        window.location.href = "./teamMemberView.html"
                    }

                }
            }
        }

    }
}
const teamOv = () => {

    const mySelect = document.getElementById("mySelect")
    const option = document.createElement("option");
    var text = localStorage.getItem("memberName");
    option.value = text;
    option.text = text;
    mySelect.add(option);
}

const cancle = () => {
    document.getElementById("myModal").style.display = "none";
}

const logout = () => {
    localStorage.setItem("login", "");
    window.location.href = "../index.html"
}

//Login authentication
const getInfo = () => {
    const name = document.getElementById('name1').value;
    const password = document.getElementById('password').value
    const data = JSON.parse(localStorage.getItem('UsersData'));


    if (data !== null) {
        if (name == "" || password == "") {
            alert("Field can not be empty")
        }
        else {
            for (i = 0; i < data.length; i++) {
                if (name == data[i].name && password == data[i].password) {
                    var n = data[i].name
                    var p = data[i].password
                    var email = data[i].email
                    break;
                }

            }
            if (name == n && password == p) {
                localStorage.setItem("login", "allowed");
                localStorage.setItem("teamOwner", name);
                localStorage.setItem("LoginEmail", email);
                window.location.href = "./html/teamsView.html";
            }

            else {
                alert("Inncorect username or password");
            }
        }
    }
    else {
        alert("Please create your account")

    }
}

const saveChanges = () => {
    Question();
}

const Question = () => {
    function Qus(question, TId) {
        this.question = question
        this.TId = TId
    }
    QusArray = JSON.parse(localStorage.getItem("Questions")) || [];
    QuestionsArray = [];
    const QueData = JSON.parse(localStorage.getItem('Questions'));
    const teamID = localStorage.getItem("Tdetails")
    const Q1 = document.getElementById("Q1").value
    const Q2 = document.getElementById("Q2").value
    const Q3 = document.getElementById("Q3").value


    if (QueData !== null) {
        for (i = 0; i < QueData.length; i++) {
            var Q = QueData[i].TId
            if (teamID == Q) {
                var Qid = Q
                var updateQuestion = QueData[i]
                break
            }
        }

        if (teamID == Qid) {
            QuestionsArray.push(Q1, Q2, Q3);
            updateQuestion.question = QuestionsArray
            localStorage.setItem("Questions", JSON.stringify(QueData));
            console.log("Update")
        }
        else if (teamID !== Qid) {
            QuestionsArray.push(Q1, Q2, Q3);
            QusArray.push(new Qus(QuestionsArray, teamID));
            localStorage.setItem("Questions", JSON.stringify(QusArray));
            console.log("new")
        }
    }
    else if (QueData == null) {
        QuestionsArray.push(Q1, Q2, Q3);
        QusArray.push(new Qus(QuestionsArray, teamID));
        localStorage.setItem("Questions", JSON.stringify(QusArray));
        console.log("Null")
    }
}

const memberView = () => {
    const Questions = JSON.parse(localStorage.getItem('Questions'));
    const Tdetails = localStorage.getItem('Tdetails')
    console.log(Tdetails)

    for (i = 0; i < Questions.length; i++) {

        if (Tdetails == Questions[i].TId) {
            var Qi = Questions[i].question;
            const para = document.createElement("p");
            const parent = document.getElementById("que");
            parent.appendChild(para);
            para.id = "para";
            var output = document.getElementById(para.id);

            for (j = 0; j < Qi.length; j++) {

                output.innerHTML += ` <br>${Qi[j]} <br>`;
                const input = document.createElement("input")
                output.appendChild(input)
                input.type = "text"
                input.id = "input" + j
            }
        }
    }
}

// Send answer to team owner

const submitAnswer = () => {
    function Answers(answerArr, answerId) {
        this.answerArr = answerArr
        this.answerId = answerId
    }
    const answerId = localStorage.getItem("Tdetails")
    const answerObj = JSON.parse(localStorage.getItem("allAnswers")) || [];
    const answerArray = []
    const ans1 = document.getElementById("input0").value;
    const ans2 = document.getElementById("input1").value;
    const ans3 = document.getElementById("input2").value;

    for (i = 0; i < answerObj.length; i++) {

        if (answerId == answerObj[i].answerId) {
            var aId = answerObj[i].answerId
            var updateAnswer = answerObj[i]
            break
        }
    }

    if (answerId == aId) {
        answerArray.push(ans1, ans2, ans3)

        updateAnswer.answerArr = answerArray
        localStorage.setItem("allAnswers", JSON.stringify(answerObj));
        console.log("Update")
    }
    else if (answerId !== aId) {
        answerArray.push(ans1, ans2, ans3)
        answerObj.push(new Answers(answerArray, answerId))
        localStorage.setItem("allAnswers", JSON.stringify(answerObj))
        console.log("new")
    }
}

//Display Questions Answers as report
const answerReport = () => {
    const takeId = localStorage.getItem("Tdetails");
    const answersArr = JSON.parse(localStorage.getItem("allAnswers"))
    const questionArr = JSON.parse(localStorage.getItem("Questions"))
    const para = document.createElement("p");
    const parent = document.getElementById("Div1");
    parent.appendChild(para);
    para.id = "para";
    const output = document.getElementById(para.id);
    
    
    for( i = 0 ; i < questionArr.length ; i++){
        if(takeId==questionArr[i].TId)
    {
        var currentQarr=questionArr[i].question
    }   
 }
 for( j = 0 ; j < answersArr.length ; j++){
    if(takeId==answersArr[j].answerId)
{
    var currentAarr=answersArr[j].answerArr
}   
}
    for( k = 0 ; k < currentQarr.length ; k++){
        output.innerHTML += `<br><lable>Question: </lable> ${currentQarr[k]} <br><lable>Answer: </lable>${currentAarr[k]}<br>`;
    }

}

const delteTeam=()=>{
    const takeId = localStorage.getItem("Tdetails");
    const dTeam = JSON.parse(localStorage.getItem('Team Data'));
    for(i=0;i<dTeam.length;i++){
        if(takeId==dTeam[i].Tid){
            dTeam.splice(i, 1);
            localStorage.setItem("Team Data", JSON.stringify(dTeam));
            window.location.href="./teamsView.html"
        }
    }

}

document.querySelector('.img__btn').addEventListener('click', function () {
    document.querySelector('.cont').classList.toggle('s--signup');
});
