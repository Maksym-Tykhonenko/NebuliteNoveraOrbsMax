import { View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const NorobsLoadim = () => {
  const dimensions = Dimensions.get('window');

  const loaderHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        html, body {
          height: 100%;
          margin: 0;
          background: transparent;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          background: transparent;
        }
        .spinner {
          background-image: linear-gradient(rgb(186, 66, 255) 35%,rgb(0, 225, 255));
          width: 100px;
          height: 100px;
          animation: spinning82341 1.7s linear infinite;
          text-align: center;
          border-radius: 50px;
          filter: blur(1px);
          box-shadow: 0px -5px 20px 0px rgb(186, 66, 255), 0px 5px 20px 0px rgb(0, 225, 255);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .spinner1 {
          background-color: rgb(36, 36, 36);
          width: 100px;
          height: 100px;
          border-radius: 50px;
          filter: blur(10px);
        }
        @keyframes spinning82341 {
          to {
            transform: rotate(360deg);
          }
        }
      </style>
    </head>
    <body>
      <div class="spinner">
        <div class="spinner1"></div>
      </div>
    </body>
    </html>
  `;

  return (
    <View style={{
      flex: 0,
      height: dimensions.height * 0.55,
      width: dimensions.width * 0.9,
      alignSelf: 'center',
    }}>
      <WebView
        style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
        showsVerticalScrollIndicator={false}
        domStorageEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        javaScriptEnabled={true}
        bounces={false}
        mixedContentMode="compatibility"
        source={{ html: loaderHTML }}
        allowsInlineMediaPlayback={true}
        scalesPageToFit={false}
      />
    </View>
  );
};

export default NorobsLoadim;