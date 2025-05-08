function checkLayerSize() {
    try {
        var doc = app.activeDocument;
        
        // Select the Right Goblin layer
        try {
            doc.activeLayer = doc.artLayers.getByName("Right Goblin");
        } catch (e) {
            try {
                doc.activeLayer = doc.artLayers.getByName("Right Goblin (Trimmed)");
            } catch (e2) {
                alert("Right Goblin 레이어를 찾을 수 없습니다.");
                return false;
            }
        }
        
        // Get the bounds of the layer content
        var bounds = doc.activeLayer.bounds;
        var width = bounds[2].value - bounds[0].value;
        var height = bounds[3].value - bounds[1].value;
        
        // Check document units
        var units = "";
        switch(doc.width.type) {
            case UnitValue.PIXELS: units = "pixels"; break;
            case UnitValue.INCHES: units = "inches"; break;
            case UnitValue.CM: units = "cm"; break;
            default: units = "unknown units";
        }
        
        // Get image dimensions
        var docWidth = doc.width.value;
        var docHeight = doc.height.value;
        
        // Calculate percentage of document
        var widthPercent = Math.round((width / docWidth) * 100);
        var heightPercent = Math.round((height / docHeight) * 100);
        
        alert("Right Goblin 레이어 정보:\n\n" + 
              "Width: " + width + " " + units + " (" + widthPercent + "% of document)\n" +
              "Height: " + height + " " + units + " (" + heightPercent + "% of document)\n\n" +
              "Layer bounds: [" + bounds[0].value + ", " + bounds[1].value + ", " + 
              bounds[2].value + ", " + bounds[3].value + "] " + units + "\n\n" +
              "Document size: " + docWidth + " x " + docHeight + " " + units);
        
        return true;
    } catch (e) {
        alert("오류 발생: " + e);
        return false;
    }
}

checkLayerSize();