// ユーザープールの設定
const poolData = {
    UserPoolId : "us-east-1_YPh5qwkdm",
    ClientId : "59da7brj3hoh0mtmomqvaq50h4"
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

/**
 * 画面読み込み時の処理
 */
$(document).ready(function() {

	// Amazon Cognito 認証情報プロバイダーの初期化
	AWSCognito.config.region = 'ap-northeast-1'; // リージョン
	AWSCognito.config.credentials = new AWS.CognitoIdentityCredentials({
	    IdentityPoolId: "us-east-1:72c4bfe5-e74b-4a5c-9c0a-b96ad755ccde"
	});

	// 「Activate」ボタン押下時
	$("#activationButton").click(function(event) {
	    activate();
	});
});

/**
 * アクティベーション処理
 */
var activate = function() {

    var email = $("#email").val();
    var activationKey = $("#activationKey").val();

    // 何か1つでも未入力の項目がある場合、処理を中断
    if (!email | !activationKey) {
        return false;
    }

    var userData = {
        Username : email,
        Pool : userPool
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    // アクティベーション処理
    cognitoUser.confirmRegistration(activationKey, true, function(err, result){
        if (err) {
            // アクティベーション失敗の場合、エラーメッセージを画面に表示
            if (err.message != null) {
                $("div#message span").empty();
                $("div#message span").append(err.message);
            }
        } else {
            window.location.href = 'signin.html';// アクティベーション成功の場合、サインイン画面に遷移
        }
    });
};