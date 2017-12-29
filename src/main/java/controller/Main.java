package controller;

import javafx.application.Application;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.input.MouseButton;
import javafx.scene.input.MouseEvent;
import javafx.scene.paint.Color;
import javafx.stage.Stage;

import java.io.File;
import java.net.URLDecoder;

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

        //set icons
        try {
            String path = "";
            String decodedPath = "";
            path = Main.class.getProtectionDomain().getCodeSource().getLocation().getPath();
            decodedPath = URLDecoder.decode(path, "UTF-8");
            decodedPath = decodedPath.substring(1, decodedPath.lastIndexOf("/") + 1);
            File tmp1 = new File(decodedPath + "resources/icon16.png");
            File tmp2 = new File(decodedPath + "resources/icon24.png");
            File tmp3 = new File(decodedPath + "resources/icon32.png");
            File tmp4 = new File(decodedPath + "resources/icon256.png");
            stage.getIcons().add(new Image(tmp1.toURI().toString()));
            stage.getIcons().add(new Image(tmp2.toURI().toString()));
            stage.getIcons().add(new Image(tmp3.toURI().toString()));
            stage.getIcons().add(new Image(tmp4.toURI().toString()));
        }catch (Exception e){
            System.out.println("no icon");
        }
        // show stage
        stage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }
}
