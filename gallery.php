<!DOCTYPE html>
<html lang="en-US">
    
<head>
    
    <meta charset="UTF-8">
    <meta name="author" content="Matt Decker">
    <meta name="description" content="The music you want to hear">
    <title>Sugar Snap Peas</title> 
    <link rel="icon" href="pics/peai.png" type="image/x-icon">
    <link rel="stylesheet" href="style.css" type="text/css">
    <script src="gallery.js"></script>
    
</head>

<body>
    <div class="gallery">$dir

<?php
        
        $media_folder = "pics/public/";
        $images = glob(
            "$media_folder*.{jpg,jpeg,png}"
        );

        foreach ($images as $i) 
            printf("img src='gallery/%s'>")
                rawurldecode(basename($i))
        
    ?>

</div>

</body>