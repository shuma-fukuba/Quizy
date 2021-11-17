let q_num = 0; // 問題番号

function Question(name, correct, incre1, incre2, img) {
    // __init__
    q_num++;
    this.name = name;
    this.correct = correct;
    this.num = q_num;
    this.getImgUrls = function(){
        return "./img/quizes/" + img;
    }
    // 答えの番号を生成（ランダム実装はまだ）
    this.answers = function () {
        cor_num = "0-" + String(q_num) + "-2";
        incr1_num = "0-" + String(q_num) + "-1";
        incre2_num = "0-" + String(q_num) + "-0";
        const cor_choice = new Choice(cor_num, correct, true);
        const inc_choice1 = new Choice(incr1_num, incre1, false);
        const inc_choice2 = new Choice(incre2, incre2, false);
        return [cor_choice, inc_choice1, inc_choice2];
    }
};

function Choice(num, sel, isCorrect){
    this.num = num; //str
    this.sel = sel; //str
    this.isCorrect = isCorrect; //bool
}

// questions はテスト用
// const questions = { "0-1-0": false, "0-1-1": false, "0-1-2": true };
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

function checkAnswer(answer) { // Choice型
    let element = document.getElementById(answer.num);
    const result_id = "a-" + String(b);
    let quiz_result = document.getElementById(result_id);
    quiz_result.style.display = "block";
    if (questions[question]) {
        // cssに正解クラスを追加
        element.classList.add("correct");
        let successed = quiz_result.getElementsByClassName("quiz-result-title");
        successed[0].classList.add("quiz-result-successed");
        successed[0].innerText = "正解！";
    } else {
        // cssに不正解クラスを追加
        element.classList.add("incorrect");
        let failed = quiz_result.getElementsByClassName("quiz-result-title")
        failed[0].classList.add("quiz-result-failed");
        failed[0].innerText = "不正解！";
    }
};
