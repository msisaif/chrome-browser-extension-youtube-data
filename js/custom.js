chrome.tabs.query(
    {
        active:true,
        lastFocusedWindow:true
    },
    tabs=>{
        let TabUrl=tabs[0].url;
        let TabUrlArray= TabUrl.split("v=");
        let VideoID=TabUrlArray[1]

        GetVideoDetails(VideoID)
    }
);


function GetVideoDetails(id) {
    const key = "AIzaSyACEy_mUshR-TSqsXdwj4L-XNc-CN6vKTE";

    const url=`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${key}&part=snippet,contentDetails,statistics,status`;

    axios.get(url).then(function (res) {
        let JSONData=res.data;

        let Items = JSONData['items'][0];
        
        let Res_VideoTitle = Items['snippet']['title'];

        let Res_VideoTags = Items['snippet']['tags'] ? (Items['snippet']['tags']).toString() : '';

        let Res_PreviewThumbnails= Items['snippet']['thumbnails']['medium']['url']

        let Res_viewCount= Items['statistics']['viewCount']
        let Res_likeCount= Items['statistics']['likeCount']
        let Res_dislikeCount= Items['statistics']['dislikeCount']
        let Res_commentCount= Items['statistics']['commentCount']

        // let Res_madeForKids= Items['status']['madeForKids']
        // let Res_live= Items['snippet']['liveBroadcastContent']
        // let Res_licensed= Items['contentDetails']['licensedContent']

        $('#VideoTitle').html(Res_VideoTitle)
        $('#tags').val(Res_VideoTags)
        $('#thumbnailPreview').attr('src',Res_PreviewThumbnails)
        $('#Comments').html(Res_commentCount)
        $('#Dislikes').html(Res_dislikeCount)
        $('#Likes').html(Res_likeCount)
        $('#Views').html(Res_viewCount)

        // licensed Status
        // if(Res_licensed===true){
        //     $('#License').html("Yes")
        // }
        // else {
        //     $('#License').html("No")
        // }

        // Kid Status
        // if(Res_madeForKids===true){
        //     $('#Child').html("Yes")
        // }
        // else {
        //     $('#Child').html("No")
        // }


        // Live Status
        // if(Res_live==="none"){
        //     $('#Live').html("No")
        // }
        // else {
        //     $('#Live').html("Yes")
        // }

        // Estimated Earning

        // let EstimatedEarning=((parseFloat(Res_viewCount))*0.0001).toFixed(2)
        // $('#Earning').html("$ "+EstimatedEarning)


        // Thumbnail Image
        $('#maxBTN').on('click',function () {
          let maxres=  Items['snippet']['thumbnails']['maxres']['url'];
            ForceDownload(maxres,"maxres.jpg")
        })

        $('#standardBTN').on('click',function () {
            let standard=  Items['snippet']['thumbnails']['standard']['url']
            ForceDownload(standard,"standard.jpg")
        })

        $('#highBTN').on('click',function () {
            let high=  Items['snippet']['thumbnails']['high']['url']
            ForceDownload(high,"high.jpg")
        })
        $('#MediumBTN').on('click',function () {
           let medium=  Items['snippet']['thumbnails']['medium']['url'];
           ForceDownload(medium,"medium.jpg")
        })

    }).catch(function (err) {

    })

}



function ForceDownload(URL,FileName) {
    chrome.downloads.download({
        url:URL,
        filename:FileName,
        saveAs:true
    })
    count=0;
}

