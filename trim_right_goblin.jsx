function trimRightGoblin() {
    try {
        var doc = app.activeDocument;
        
        // Select the Right Goblin layer
        try {
            doc.activeLayer = doc.artLayers.getByName("Right Goblin");
        } catch (e) {
            alert("Right Goblin 레이어를 찾을 수 없습니다.");
            return false;
        }
        
        // First, remove the purple background
        // Select Color Range
        var idClrR = charIDToTypeID("ClrR");
        var desc = new ActionDescriptor();
        var idFzns = charIDToTypeID("Fzns");
        desc.putInteger(idFzns, 60); // Higher fuzziness for better selection
        
        // Set the color to select (purple)
        var idMnCl = charIDToTypeID("MnCl");
        var desc2 = new ActionDescriptor();
        var idRd = charIDToTypeID("Rd  ");
        desc2.putDouble(idRd, 128);  // Red component
        var idGrn = charIDToTypeID("Grn ");
        desc2.putDouble(idGrn, 0);   // Green component
        var idBl = charIDToTypeID("Bl  ");
        desc2.putDouble(idBl, 128);  // Blue component
        var idRGBC = charIDToTypeID("RGBC");
        desc.putObject(idMnCl, idRGBC, desc2);
        
        // Execute the Color Range command
        executeAction(idClrR, desc, DialogModes.NO);
        
        // Delete the selected purple background
        app.activeDocument.selection.clear();
        app.activeDocument.selection.deselect();
        
        // Create a duplicate document
        var dupDoc = app.documents.add(
            doc.width, 
            doc.height, 
            doc.resolution, 
            "Temp Document", 
            NewDocumentMode.RGB, 
            DocumentFill.TRANSPARENT
        );
        
        // Go back to original document
        app.activeDocument = doc;
        
        // Copy the layer content
        doc.activeLayer = doc.artLayers.getByName("Right Goblin");
        doc.selection.selectAll();
        doc.selection.copy();
        
        // Go to the duplicate document
        app.activeDocument = dupDoc;
        
        // Paste the content
        dupDoc.paste();
        
        // Trim the document to remove transparent pixels
        dupDoc.trim(TrimType.TRANSPARENT);
        
        // Select all and copy the trimmed content
        dupDoc.selection.selectAll();
        dupDoc.selection.copy();
        
        // Close the duplicate document without saving
        dupDoc.close(SaveOptions.DONOTSAVECHANGES);
        
        // Go back to original document
        app.activeDocument = doc;
        
        // Create a new layer for the trimmed content
        var newLayer = doc.artLayers.add();
        newLayer.name = "Right Goblin (Trimmed)";
        
        // Paste the trimmed content
        doc.paste();
        
        // Hide the original layer
        doc.artLayers.getByName("Right Goblin").visible = false;
        
        alert("Right Goblin 레이어가 성공적으로 고블린 사이즈에 맞게 조정되었습니다.");
        return true;
    } catch (e) {
        alert("오류 발생: " + e);
        return false;
    }
}

trimRightGoblin();