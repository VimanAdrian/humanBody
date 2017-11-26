package sample;


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

public class Browser extends Region {

    private final HBox toolBar;
    final private static String[] imageFiles = new String[]{
            "product.png",
            "blog.png",
            "documentation.png",
            "partners.png",
            "help.png"
    };
    final private static String[] captions = new String[]{
            "Cantecel corp"
            //"Blogs",
            //"Documentation",
            //"Partners",
            //"Help"
    };
    final private static String[] urls = new String[]{
            "https://www.youtube.com/watch?v=g6ix1KSnIFA",
            //"http://blogs.oracle.com/",
            //"http://docs.oracle.com/javase/index.html",
            //"http://www.oracle.com/partners/index.html",
            //Browser.class.getResource("sample/help.html").toExternalForm()
    };
    final ImageView selectedImage = new ImageView();
    final Hyperlink[] hpls = new Hyperlink[captions.length];
    final Image[] images = new Image[imageFiles.length];
    final WebView browser = new WebView();
    final WebEngine webEngine = browser.getEngine();
    final Button toggleHelpTopics = new Button("Toggle Help Topics");
    final WebView smallView = new WebView();
    final ComboBox comboBox = new ComboBox();
    private boolean needDocumentationButton = false;


    public Browser(final Stage stage) {
        //apply the styles
        getStyleClass().add("browser");

        for (int i = 0; i < captions.length; i++) {
            // create hyperlinks
            Hyperlink hpl = hpls[i] = new Hyperlink(captions[i]);
            //Image image = images[i]
            //        = new Image(Browser.class.getResourceAsStream(imageFiles[i]));
            //hpl.setGraphic(new ImageView(image));
            final String url = urls[i];
            final boolean addButton = (hpl.getText().equals("Help"));

            // process event
            hpl.setOnAction((ActionEvent e) -> {
                needDocumentationButton = addButton;
                webEngine.load(url);
            });

        }


        comboBox.setPrefWidth(60);

        // create the toolbar
        toolBar = new HBox();
        toolBar.setAlignment(Pos.CENTER);
        toolBar.getStyleClass().add("browser-toolbar");
        toolBar.getChildren().add(comboBox);
        toolBar.getChildren().addAll(hpls);
        toolBar.getChildren().add(createSpacer());

        //set action for the button
        toggleHelpTopics.setOnAction((ActionEvent t) -> {
            webEngine.executeScript("toggle_visibility('help_topics')");
        });

        smallView.setPrefSize(120, 80);

        //handle popup windows
        webEngine.setCreatePopupHandler(
                (PopupFeatures config) -> {
                    smallView.setFontScale(0.8);
                    if (!toolBar.getChildren().contains(smallView)) {
                        toolBar.getChildren().add(smallView);
                    }
                    return smallView.getEngine();
                });

        //process history
        final WebHistory history = webEngine.getHistory();
        history.getEntries().addListener(
                (ListChangeListener.Change<? extends WebHistory.Entry> c) -> {
                    c.next();
                    c.getRemoved().stream().forEach((e) -> {
                        comboBox.getItems().remove(e.getUrl());
                    });
                    c.getAddedSubList().stream().forEach((e) -> {
                        comboBox.getItems().add(e.getUrl());
                    });
                });

        //set the behavior for the history combobox
        comboBox.setOnAction((Event ev) -> {
            int offset
                    = comboBox.getSelectionModel().getSelectedIndex()
                    - history.getCurrentIndex();
            history.go(offset);
        });

        // process page loading
        webEngine.getLoadWorker().stateProperty().addListener(
                (ObservableValue<? extends Worker.State> ov, Worker.State oldState,
                 Worker.State newState) -> {
                    toolBar.getChildren().remove(toggleHelpTopics);
                    if (newState == Worker.State.SUCCEEDED) {
                        JSObject win
                                = (JSObject) webEngine.executeScript("window");
                        win.setMember("app", new JavaApp());
                        if (needDocumentationButton) {
                            toolBar.getChildren().add(toggleHelpTopics);
                        }
                    }
                });
        //adding context menu
        final ContextMenu cm = new ContextMenu();
        MenuItem cmItem1 = new MenuItem("Print");
        cm.getItems().add(cmItem1);
        toolBar.addEventHandler(MouseEvent.MOUSE_CLICKED, (MouseEvent e) -> {
            if (e.getButton() == MouseButton.SECONDARY) {
                cm.show(toolBar, e.getScreenX(), e.getScreenY());
            }
        });

        //processing print job
        cmItem1.setOnAction((ActionEvent e) -> {
            PrinterJob job = PrinterJob.createPrinterJob();
            if (job != null) {
                webEngine.print(job);
                job.endJob();
            }
        });

        // load the home page
        webEngine.load("http://www.oracle.com/products/index.html");

        //add components
        getChildren().add(toolBar);
        getChildren().add(browser);
    }

    // JavaScript interface object
    public class JavaApp {

        public void exit() {
            Platform.exit();
        }
    }

    private Node createSpacer() {
        Region spacer = new Region();
        HBox.setHgrow(spacer, Priority.ALWAYS);
        return spacer;
    }

    @Override
    protected void layoutChildren() {
        double w = getWidth();
        double h = getHeight();
        double tbHeight = toolBar.prefHeight(w);
        layoutInArea(browser,0,0,w,h-tbHeight,0, HPos.CENTER, VPos.CENTER);
        layoutInArea(toolBar,0,h-tbHeight,w,tbHeight,0,HPos.CENTER,VPos.CENTER);
    }

    @Override
    protected double computePrefWidth(double height) {
        return 900;
    }

    @Override
    protected double computePrefHeight(double width) {
        return 600;
    }
}
