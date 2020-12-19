import Sound from 'react-native-sound';

Sound.setCategory('Ambient', true);

const sonido_inicio = new Sound(require('./inicio.mp3'), error => console.log(error));
export const playButtonPress = () => {
  sonido_inicio.play((success) => buttonPress.reset());
}

// const playListPull = new Sound(require('../audio/pull.mp3'), error => console.log(error));
// export const playListPull = () => {
//   pull.play((success) => pull.reset());
// }

// const playListPullFinished = new Sound(require('../audio/pullFinished.mp3'), error => console.log(error));
// export const playListPullFinished = () => {
//   pullFinished.play((success) => pullFinished.reset());
// }