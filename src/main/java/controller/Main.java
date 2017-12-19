package controller;

import javafx.application.Application;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.input.MouseButton;
import javafx.scene.input.MouseEvent;
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

        stage.getScene().addEventFilter(MouseEvent.MOUSE_RELEASED,
                new EventHandler<MouseEvent>() {
                    public void handle(MouseEvent event) {
                        if (event.getButton() == MouseButton.SECONDARY) {
                            event.consume();
                        }

                    }
                });

        // show stage
        stage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
