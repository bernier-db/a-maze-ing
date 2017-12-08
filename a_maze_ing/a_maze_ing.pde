import java.io.*;
enum os {win, mac, linux, other}
Process p;
String filePath;


void setup(){
  filePath  = dataPath("index.html");
  filePath = filePath.replaceAll(" ","\" \"");

try {
    String command = "";
    switch(getOs()){
      case win:
      command = "cmd /c start ";
      break;
      case mac:
      command = "open ";
      break;
      case linux:
      command = "xdg-open ";
      break;
      default:
      javax.swing.JOptionPane.showMessageDialog(null, "Os non supporté");
      break;
    }
    p = Runtime.getRuntime().exec(command + filePath + " -fullscreen");
    p.waitFor();
   
} catch (InterruptedException e) {
    e.printStackTrace();
} catch (IOException e) {
    e.printStackTrace();
}  

}

os getOs()
  {
    String osName="";
    // Getting OS name
    osName = System.getProperty("os.name");
  
    System.out.println("--------------");
    
    System.out.println(osName);
    
    if (osName.toLowerCase().indexOf("win") >= 0) {
      return os.win;
    } else if (osName.toLowerCase().indexOf("mac") >= 0) {
      return os.mac;
    } else if (osName.toLowerCase().indexOf("nix") >= 0 || osName.toLowerCase().indexOf("nux") >= 0 || osName.toLowerCase().indexOf("aix") > 0 ) {
      return os.linux;
    } else {
      return os.other;
    }
  }