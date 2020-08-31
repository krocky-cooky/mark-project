let imgElement = document.getElementById('imgelement');
    let inputElement = document.getElementById('id_file');
    inputElement.addEventListener('change', (e) => {
        imgElement.src = URL.createObjectURL(e.target.files[0]);
        }, false);
    
    function upload(){
        let file = $('#id_file').prop('files')[0];
        $('#result').show();
        $('#loading').addClass('active');
        $('submit-btn').addClass('disabled');
        $('#table').empty();
        let imgElement = document.getElementById('imgelement');
        let testName = $('#test_name').val();
        let inputElement = document.getElementById('id_file')
        let canvas = document.getElementById('canvasId');
        let email = currentUserData['email'];
        inputElement.addEventListener('change', (e) => {
            imgElement.src = URL.createObjectURL(e.target.files[0]);
            }, false);
        let mat = cv.imread(imgElement);
        let text = $('#id_text').val();
        let fd = new FormData();
        fd.append('text',text);
        fd.append('file',file);
        $.ajax({
            url : "https://u9qafpro04.execute-api.us-east-1.amazonaws.com/test",
            type : 'post',
            contentType : false,
            processData : false,
            data : fd
        }).then(
            data => {
                console.log(data);
                $('#table')
                var ans = 0;
                var i = 0;
                while(true){
                    var str_i = String(i);
                    if(data['body'][str_i]){
                        var d = data['body'][str_i];
                        if(d['TrueOrFalse']){
                            x = mat.cols*d['state_x'];
                            y = mat.rows*d['state_y'];
                            var center = new cv.Point(x,y);
                            cv.circle(mat,center,25,[255, 0, 0, 255],2);
                            ans++;
                        }
                    }else{
                        break;
                    }
                    ++i;
                }
                cv.imshow('canvasId',mat);
                mat.delete();
                $('#table').append('<tr><td>問題数:</td><td>' + String(i) + '</td></tr>');
                $('#table').append('<tr><td>正解数:</td><td>' + String(ans) + '</td></tr>');
                $('#table_seg').show();
                $('#loading').removeClass('active');
                $('#submit-btn').removeClass('disabled');
                const canvas_img = document.querySelector("#canvasId").toDataURL("image/png");
                console.log(typeof canvas_img);
                data_dict = {
                    'image' : canvas_img,
                    'email' : email,
                    'test' : testName
                }
                $.ajax({
                    url : 'https://isaqeh1up4.execute-api.us-east-1.amazonaws.com/test/test2-2',
                    type : 'post',
                    dataType : 'json',
                    data : JSON.stringify(data_dict)
                }).then(
                    data => {
                        console.log(data);
                        console.log('処理終了')
                    },
                    error => {
                        console.log('ここでは失敗')
                    }
                )
            },
            error => {
                alert('fail');
            }
        )




    }

$('#modal-open').on('click',function(){
    $('#modal-base').fadeIn();
})

$('#upload-button').on('click',function(e){
    $('#test').text($('#test_name').val());
    $('#answer').text($('#id_text').val());
    $('#modal-base').fadeOut();
    $('#blackseg').show();
})