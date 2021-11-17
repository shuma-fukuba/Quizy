let q_num = 0;

var Question = function (name, correct, incre1, incre2, img) {
    // __init__
    q_num++;
    this.name = name;
    this.correct = correct;
    this.incre1 = incre1;
    this.incre2 = incre2;

    this.getImgUrls = function(){
        return "./img/quizes/" + img;
    }
    // 答えの番号を生成（ランダム実装はまだ）
    this.answers = function () {
        cor_num = "0-" + String(q_num) + "-2";
        incr1_num = "0-" + String(q_num) + "-1";
        incre2_num = "0-" + String(q_num) + "-0";
        return {cor_unm: true, incre1: false, incre2: false};
    }   

};

// questions はテスト用
const questions = { "0-1-0": false, "0-1-1": false, "0-1-2": true };
q1 = Question("高輪", "たかなわ", "こうわ", "たかわ", 1, "takanawa.png");
q2 = Question("亀戸", "かめいど", "かめど", "かめと", 2, "takanawa.png");

function checkAnswer(a, b, c) {
    let question = String(a) + "-" + String(b) + "-" + String(c);
    let element = document.getElementById(question);
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
