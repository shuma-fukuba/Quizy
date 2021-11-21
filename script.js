let questionNum = 0; // 問題番号
let count = 0; // 正解した問題の数

const CHOICELENGTH = 3;

// 問題のクラス
function Question(name, correct, incrrect1, incrrect2, img) {
    // __init__
    questionNum++;
    this.name = name;
    this.correct = correct;
    this.num = questionNum;
    this.getImgUrls = function () {
        return "./img/quizes/" + img;
    };
    // 選択肢の配列を返す
    this.getAnswers = function () {
        correctNum = "";
        incrrect1Num = "";
        incrrect2Num = "";
        const correctChoice = new Choice(correctNum, correct, true, this.num);
        const incrrectChoice1 = new Choice(incrrect1Num, incrrect1, false, this.num);
        const incrrectChoice2 = new Choice(incrrect2Num, incrrect2, false, this.num);

        let answers = [correctChoice, incrrectChoice1, incrrectChoice2];
        // 選択肢をシャッフル
        answers = shuffle(answers);
        for (let i = 0; i < CHOICELENGTH; i++){
            answers[i].choiceNum = "0-" + String(this.num) + "-" + String(i);
        }
        return answers;
    };

    this.getAnswerSentense = function() {
        if (this.name == "鹿骨"){
            return `江戸川区にあります。`;
        } else {
            return `正解は「${this.correct}」です！`;
        }
    };
    this.answers = this.getAnswers();
};

// 選択肢のクラス
function Choice(choiceNum, selectContent, isCorrect, questionNum) {
    this.choiceNum = choiceNum; //str
    this.selectContent = selectContent; //str
    this.isCorrect = isCorrect; //bool
    this.questionNum = questionNum; //int
}

// 正解かどうか判別
function checkAnswer(num, isCorrect, questionNum) { // Choice型の各変数
    const resultId = "a-" + String(questionNum);
    let quizResult = document.getElementById(resultId);
    let element = document.getElementById(num);
    quizResult.style.display = "block";
    if (isCorrect) {
        // cssに正解クラスを追加
        element.classList.add("correct");
        let successed = quizResult.getElementsByClassName("quiz-result-title");
        successed[0].classList.add("quiz-result-successed");
        successed[0].innerText = "正解！";
        count++;
    } else {
        // cssに不正解クラスを追加
        element.classList.add("incorrect");
        let failed = quizResult.getElementsByClassName("quiz-result-title")
        failed[0].classList.add("quiz-result-failed");
        failed[0].innerText = "不正解！";
    }
};


// 問題番号を引数にとり、正解の選択肢のcssをつける。また、全てのボタンをクリックできなくする（問題の選択肢のli全てにdisabledをつける）
function choiceDisabled(questionNum) {
    let questionClass = questions[questionNum - 1];
    let questionChoices = questionClass.answers;
    for (let i = 0; i <= 3; i++) {
        let choiceNum = "0-" + String(questionNum) + "-" + String(i);
        let element = document.getElementById(choiceNum);
        if (questionChoices[i].isCorrect) {
            element.classList.add("correct");
        }
        element.classList.add("disabled");
    }
}

// 配列をシャッフルする関数
const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 問題を生成
const takanawa = new Question("高輪", "たかなわ", "こうわ", "たかわ", "takanawa.png");
const kameido = new Question("亀戸", "かめいど", "かめど", "かめと", "kameido.png");
const koujimachi = new Question("麹町", "こうじまち", "おかとまち", "かゆまち", "koujimachi.png");
const onarimon = new Question("御成門", "おなりもん", "おかどもん", "ごせいもん", "onarimon.png");
const todoroki = new Question("等々力", "とどろき", "たたら", "たたりき", "todoroki.png");
const shakuji = new Question("石神井", "しゃくじい", "いじい", "せきこうい", "shakuji.png");
const zoushiki = new Question("雑色", "ぞうしき", "ざっしょく", "ざっしき", "zoushiki.png");
const okachimachi = new Question("御徒町", "おかちまち", "ごしろちょう", "みとちょう", "okachimachi.png");
const shishibone = new Question("鹿骨", "ししぼね", "しこね", "ろっこつ", "shishibone.png");
const kogure = new Question("小榑", "こぐれ", "こしゃく", "こばく", "kogure.png");

const questions = [takanawa, kameido, koujimachi, onarimon, todoroki, shakuji, zoushiki, okachimachi, shishibone, kogure];


window.onload = function(){
    let questionHtml = ``;
    for (let question of questions) {
        let choices = ``;
        for (c of question.answers) {
            choices +=
                `<li class="choice" id="${c.choiceNum}" onclick="checkAnswer('${c.choiceNum}', ${c.isCorrect}, ${c.questionNum}); choiceDisabled(${question.num});">${c.selectContent}</li>`;
        };

        questionHtml += `
<section class="quiz">
    <h1>${question.num}この地名はなんて読む?</h1>
    <img src=${question.getImgUrls()} alt="${question.name}">
    <ul class ="choices">${choices}
    </ul>
    <div class ="quiz-result" id="a-${question.num}">
        <p class ="quiz-result-title"></p>
        <p class ="quiz-result-description">${question.getAnswerSentense()}</p>
        </div>
</section>`;
    };
    let articleTag = document.getElementById("questions");
    articleTag.innerHTML = questionHtml;
}
