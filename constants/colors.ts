const Colors: {
  light: Record<string, any>;
  dark: Record<string, any>;
  fileTypes: Record<string, string>;
  categoryIcons: Record<string, string>;
} = {
  light: {
    primary: '#4169E1',
    primaryGradient: ['#4169E1', '#6495ED'],
    background: '#F8F9FA',
    card: '#FFFFFF',
    text: '#212121',
    secondaryText: '#757575',
    accent: '#4169E1',
    border: '#E0E0E0',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
  },
  dark: {
    primary: '#5B7FFF',
    primaryGradient: ['#5B7FFF', '#7B96FF'],
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    secondaryText: '#AAAAAA',
    accent: '#5B7FFF',
    secondaryAccent: '#7B96FF',
    border: '#333333',
    success: '#4CAF50',
    error: '#F44336',
    warning: '#FFC107',
    info: '#2196F3',
  },
  fileTypes: {
    image: '#5B7FFF',
    video: '#FFC107',
    document: '#26C6DA',
    audio: '#FF7043',
    archive: '#FFCA28',
    download: '#FFCA28',
    apk: '#5B7FFF',
    unknown: '#9E9E9E',
  } as Record<string, string>, // Burada indeks tipini belirttik
  categoryIcons: {
    photos: '#5B7FFF',
    videos: '#FFC107',
    music: '#FF7043',
    documents: '#26C6DA',
    downloads: '#FFCA28',
    apk: '#5B7FFF',
  },
};

export default Colors;
