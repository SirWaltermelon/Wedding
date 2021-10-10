        //Set up local session storage
        if (sessionStorage.getItem("introPlayed")=="true") {
            $("#coverPage").addClass("hide")
            $("#pageContent").fadeIn(2000)
        }else {
            sessionStorage.setItem("introPlayed", "false")
        }
        
        //Audio set up for begin button on the cover page
       var audio =  document.getElementById("audio");
       audio.volume = 0.1;
       var coin = document.getElementById("coin");
       coin.volume = 0.1;
        
        $("#musicButton").click( function() {
            $("#coin").get(0).play();
            $(".my_audio").get(0).play();
            $("#coverPage").fadeOut(4000, function() {
                $("#pageContent").fadeIn(3000);
            });
            sessionStorage.setItem("introPlayed", "true");
        });
        $("#play").click(function() {
            $(this).toggleClass("pause")
        })

        var isplaying = document.getElementById("audio")
        isplaying = true

        $("#play").click( function() {
            if (isplaying == true) {
                isplaying = false
                document.getElementById("audio").pause();
            }else {
                isplaying = true
                document.getElementById("audio").play();
            }
        })
        //End audio button functions

        //Setup playlist for additional songs on the site
        var nextSong = [
        "music/The Book of Love.mp3",
        "music/It Must Be Love.mp3",
        "music/Let's Get Married.mp3"
        ]
        var i = 0
        var Player = document.getElementById("audio")
        Player.onended = function() {
            if (i < nextSong.length) {
                Player.src = nextSong[i]; Player.play();
                ++i
            }else{
                i=0
            }
        }
        //End playlist section

        $("#yosh").on("click", function(e) {
            e.preventDefault();
            $("#yoshModal").modal("toggle");
        })
    

    
        const firestore = firebase.firestore();
        const settings = {/* your settings... */ timestampsInSnapshots: true };
        firestore.settings(settings);
        const db = firebase.firestore();
    
        db.collection('messages')
          .onSnapshot((snap) => {
            const messages = snap.docs.map(d => ({
              id: d.id,
              ...d.data(),
            }));
    
            // Clear any existing messages
            $('.messages').empty();
    
            // Loop over messges and create one "post" per message.
            var html = '';
            messages.forEach((m) => {
              html += `
                <div class="post rounded">
                  <div>${m.author || 'An anonymous person '} ${moment(m.sentDate.toDate()).format('MM/DD/YYYY')}:</div>
                  <div class="mb-4">${m.message}</div>
                </div>
              `;
            });
    
            // Push html
            $('.messages').html(html);
          });
          function submitPost() {
        const author = $('#Name').val();
        const message =$('#Comment').val();

        db.collection('messages')
          .add({
            author,
            message,
            sentDate: new Date()
          });

        $('#Name').val('');
        $('#Comment').val('');
        alert('Thanks for the comment!');
        return false;
      }