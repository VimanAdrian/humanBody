package controller;


import javafx.application.Platform;
import javafx.beans.value.ObservableValue;
import javafx.collections.ListChangeListener;
import javafx.concurrent.Worker;
import javafx.event.ActionEvent;
import javafx.event.Event;
import javafx.geometry.HPos;
import javafx.geometry.Pos;
import javafx.geometry.VPos;
import javafx.print.PrinterJob;
import javafx.scene.Node;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseButton;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Priority;
import javafx.scene.layout.Region;
import javafx.scene.web.PopupFeatures;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebHistory;
import javafx.scene.web.WebView;
import javafx.stage.Stage;
import netscape.javascript.JSObject;
import org.apache.commons.io.IOUtils;

import java.io.File;
import java.io.InputStream;
import java.io.StringWriter;
import java.net.URLDecoder;
import java.util.Arrays;


public class Browser extends Region {

    private final WebView browser = new WebView();
    private final WebEngine webEngine = browser.getEngine();

    Browser(final Stage stage) {

        // process page loading
        webEngine.getLoadWorker().stateProperty().addListener(
                (ObservableValue<? extends Worker.State> ov, Worker.State oldState,
                 Worker.State newState) -> {
                    if (newState == Worker.State.SUCCEEDED) {
                        JSObject win
                                = (JSObject) webEngine.executeScript("window");
                        win.setMember("app", new JavaApp());
                    }
                });

        // load the home page
        String path = "";
        String decodedPath = "";
        try {
            path = Main.class.getProtectionDomain().getCodeSource().getLocation().getPath();
            decodedPath = URLDecoder.decode(path, "UTF-8");
            decodedPath = decodedPath.substring(1, decodedPath.lastIndexOf("/") + 1);
            File first = new File(decodedPath + "resources/html/index.html");
            System.out.println(decodedPath);
            webEngine.load(first.toURI().toString());
        } catch (Exception e) {
            System.out.println(Arrays.toString(e.getStackTrace()));
            String error =
                    "<html>\n" +
                    "<header>" +
                            "<title>Eroare</title>" +
                    "</header>\n" +
                    "<body>\n" +
                        "<p>Ceva a mers gresit. Oooops. </p>" +
                        "<p>Ne cerem scuze pentru asta. Va rugam sa incercati sa reinstalati aplicatia." +
                        "<p>Multumim</p>" +
                    "</body>\n" +
                    "</html>";
            webEngine.loadContent(error);
        }
        getChildren().add(browser);
    }

    @Override
    protected void layoutChildren() {
        double w = getWidth();
        double h = getHeight();
        layoutInArea(browser, 0, 0, w, h, 0, HPos.CENTER, VPos.CENTER);
    }

    @Override
    protected double computePrefWidth(double height) {
        return 720;
    }

    @Override
    protected double computePrefHeight(double width) {
        return 1000;
    }

    // JavaScript interface object
    public class JavaApp {
        public void exit() {
            Platform.exit();
        }
    }
}
