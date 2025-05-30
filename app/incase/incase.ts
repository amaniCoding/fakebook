/**
 * for (const meida in medias) {
  const name = medias[meida].name;
  const file = medias[meida];
  const type = medias[meida].type;

  try {
    const blob = await put(name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    const photoUrl = blob.url;
    const mediaData = {
      url: photoUrl,
      type: type,
    };
    photoUrls.push(mediaData);
  } catch {}
}



const onKeyDownPost = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setrowsFromPostBox(rowsFromPostBox + 1);
    } else if (e.key === "Backspace") {
      if (rowsFromPostBox <= 1) {
      } else {
        setrowsFromPostBox(rowsFromPostBox - 1);
      }
      //even if the rows is greater than one, it should only minus one from rows
    }
  };




const onKeyDownPostText = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      setrowsFromPostBox(rowsFromPostBox + 1);

      if (marginTopFromPostBox <= 3.5) {
      } else {
        setmarginTopFromPostBox(marginTopFromPostBox - 1);
      }
    } else if (e.key === "Backspace") {
      if (rowsFromPostBox <= 1) {
      } else {
        setrowsFromPostBox(rowsFromPostBox - 1);
      }

      if (marginTopFromPostBox >= 6) {
      } else {
        
        if (rowsFromPostBox <= 7) {
          setmarginTopFromPostBox(marginTopFromPostBox + 1);
        }
      }
    }
  };
 */

/**
 * The height of postBox will be pushed when the it's height becomes less
 * than it's maximum height (when the scroll-bar invisible)
 *
 *
 * But when the postBox height increases passing it's maximum height
 * depending on rows of textarea, as backspace pressed it's
 * margin pushes it down, that should not happen.
 *
 * updating it's marginTop should have effect when  it's height
 * is less than it's maximum height ! How exactly i know, it's
 * maximum height reached, well, by row count ...
 *
 *
 * then it's marginTop and height will be adjusted together.
 */
