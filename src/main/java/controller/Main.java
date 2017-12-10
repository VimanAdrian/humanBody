package controller;

import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

public class Main extends Application {

    private Scene scene;

    @Override
    public void start(Stage stage) throws Exception{
        // create scene
        stage.setTitle("Corpul uman");
        scene = new Scene(new Browser(stage), 1020, 740, Color.web("#FFFFFF"));
        stage.setScene(scene);
        stage.setResizable(false);
        stage.setTitle("Corpul Uman");
        // apply CSS style
        scene.getStylesheets().add("css/BrowserToolbar.css");
        // show stage
        stage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
