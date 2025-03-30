import { FileItem } from '@/types/files';
import { mockFiles } from '@/mocks/files';

// Simulates AI processing of user queries
export const processUserQuery = (query: string): { 
  response: string; 
  files: FileItem[];
  action?: string;
  actionData?: any;
} => {
  const lowerQuery = query.toLowerCase();
  let response = '';
  let files: FileItem[] = [];
  let action = undefined;
  let actionData = undefined;

  // Handle different query types
  if (lowerQuery.includes('merhaba') || lowerQuery.includes('selam') || lowerQuery.includes('nasıl')) {
    response = "Merhaba! Size nasıl yardımcı olabilirim? Dosyalarınızı bulmak, kategorize etmek veya yönetmek için bana sorabilirsiniz.";
  } 
  else if (lowerQuery.includes('kolaj') || lowerQuery.includes('collage')) {
    if (lowerQuery.includes('selfi') || lowerQuery.includes('selfie') || lowerQuery.includes('özçekim')) {
      const selfies = mockFiles.filter(file => 
        file.type === 'image' && 
        (file.name.toLowerCase().includes('selfie') || file.name.toLowerCase().includes('portrait'))
      );
      
      if (selfies.length > 0) {
        files = selfies;
        response = `${selfies.length} adet selfie buldum. Bunlardan bir kolaj oluşturuyorum...`;
        action = 'create_collage';
        actionData = {
          images: selfies,
          layout: 'grid',
          title: 'Instagram Kolajı'
        };
      } else {
        response = "Maalesef selfie olarak etiketlenmiş fotoğraf bulamadım. Başka bir fotoğraf türü ile kolaj oluşturmak ister misiniz?";
      }
    } else if (lowerQuery.includes('manzara') || lowerQuery.includes('landscape')) {
      const landscapes = mockFiles.filter(file => 
        file.type === 'image' && 
        (file.name.toLowerCase().includes('landscape') || file.path.toLowerCase().includes('landscape'))
      );
      
      if (landscapes.length > 0) {
        files = landscapes;
        response = `${landscapes.length} adet manzara fotoğrafı buldum. Bunlardan bir kolaj oluşturuyorum...`;
        action = 'create_collage';
        actionData = {
          images: landscapes,
          layout: 'panorama',
          title: 'Manzara Kolajı'
        };
      } else {
        response = "Maalesef manzara olarak etiketlenmiş fotoğraf bulamadım. Başka bir fotoğraf türü ile kolaj oluşturmak ister misiniz?";
      }
    } else {
      // Generic collage request
      const images = mockFiles.filter(file => file.type === 'image').slice(0, 4);
      if (images.length > 0) {
        files = images;
        response = `${images.length} adet fotoğraf seçtim. Bunlardan bir kolaj oluşturuyorum...`;
        action = 'create_collage';
        actionData = {
          images: images,
          layout: 'grid',
          title: 'Fotoğraf Kolajı'
        };
      } else {
        response = "Kolaj oluşturmak için fotoğraf bulamadım. Lütfen önce bazı fotoğraflar yükleyin.";
      }
    }
  }
  else if (lowerQuery.includes('düzenle') || lowerQuery.includes('edit') || lowerQuery.includes('filtre')) {
    const images = mockFiles.filter(file => file.type === 'image').slice(0, 1);
    if (images.length > 0) {
      files = images;
      response = "Bu fotoğrafı düzenlemek için hangi filtreyi uygulamak istersiniz? Siyah-beyaz, vintage, parlak veya kontrast filtreleri mevcut.";
      action = 'edit_photo';
      actionData = {
        image: images[0],
        availableFilters: ['siyah-beyaz', 'vintage', 'parlak', 'kontrast']
      };
    } else {
      response = "Düzenlemek için fotoğraf bulamadım. Lütfen önce bir fotoğraf yükleyin.";
    }
  }
  else if (lowerQuery.includes('fotoğraf') || lowerQuery.includes('resim') || lowerQuery.includes('foto')) {
    if (lowerQuery.includes('son') || lowerQuery.includes('yeni')) {
      files = mockFiles
        .filter(file => file.type === 'image')
        .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
        .slice(0, 5);
      response = "En son eklenen 5 fotoğrafınız:";
    } else if (lowerQuery.includes('manzara')) {
      files = mockFiles.filter(file => 
        file.type === 'image' && 
        (file.name.toLowerCase().includes('landscape') || file.path.toLowerCase().includes('landscape'))
      );
      response = files.length > 0 
        ? `${files.length} adet manzara fotoğrafı buldum.` 
        : "Manzara fotoğrafı bulamadım. Farklı bir arama yapmak ister misiniz?";
    } else if (lowerQuery.includes('selfie') || lowerQuery.includes('özçekim') || lowerQuery.includes('portre')) {
      files = mockFiles.filter(file => 
        file.type === 'image' && 
        (file.name.toLowerCase().includes('selfie') || file.name.toLowerCase().includes('portrait'))
      );
      response = files.length > 0 
        ? `${files.length} adet selfie/portre fotoğrafı buldum.` 
        : "Selfie veya portre fotoğrafı bulamadım. Farklı bir arama yapmak ister misiniz?";
    } else {
      files = mockFiles.filter(file => file.type === 'image');
      response = `${files.length} fotoğraf buldum. İşte sonuçlar:`;
    }
  } 
  else if (lowerQuery.includes('video')) {
    if (lowerQuery.includes('son') || lowerQuery.includes('yeni')) {
      files = mockFiles
        .filter(file => file.type === 'video')
        .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime())
        .slice(0, 3);
      response = "En son eklenen 3 videonuz:";
    } else {
      files = mockFiles.filter(file => file.type === 'video');
      response = `${files.length} video buldum. İşte sonuçlar:`;
    }
  } 
  else if (lowerQuery.includes('belge') || lowerQuery.includes('doküman') || lowerQuery.includes('dosya')) {
    if (lowerQuery.includes('iş') || lowerQuery.includes('work')) {
      files = mockFiles.filter(file => 
        file.type === 'document' && 
        (file.category === 'Work' || file.path.toLowerCase().includes('work'))
      );
      response = `${files.length} iş belgesi buldum. İşte sonuçlar:`;
    } else if (lowerQuery.includes('kişisel') || lowerQuery.includes('personal')) {
      files = mockFiles.filter(file => 
        file.type === 'document' && 
        (file.category === 'Personal' || file.path.toLowerCase().includes('personal'))
      );
      response = `${files.length} kişisel belge buldum. İşte sonuçlar:`;
    } else {
      files = mockFiles.filter(file => file.type === 'document');
      response = `${files.length} belge buldum. İşte sonuçlar:`;
    }
  } 
  else if (lowerQuery.includes('müzik') || lowerQuery.includes('ses') || lowerQuery.includes('audio')) {
    files = mockFiles.filter(file => file.type === 'audio');
    response = `${files.length} ses dosyası buldum. İşte sonuçlar:`;
  } 
  else if (lowerQuery.includes('arşiv') || lowerQuery.includes('zip')) {
    files = mockFiles.filter(file => file.type === 'archive');
    response = `${files.length} arşiv dosyası buldum. İşte sonuçlar:`;
  } 
  else if (lowerQuery.includes('yıldız') || lowerQuery.includes('favori')) {
    files = mockFiles.filter(file => file.starred);
    response = `${files.length} yıldızlı dosya buldum. İşte sonuçlar:`;
  } 
  else if (lowerQuery.includes('iş') || lowerQuery.includes('çalışma')) {
    files = mockFiles.filter(file => file.category === 'Work');
    response = `${files.length} iş dosyası buldum. İşte sonuçlar:`;
  } 
  else if (lowerQuery.includes('tatil') || lowerQuery.includes('gezi')) {
    files = mockFiles.filter(file => 
      file.name.toLowerCase().includes('vacation') || 
      file.category === 'Travel'
    );
    response = `${files.length} tatil ile ilgili dosya buldum. İşte sonuçlar:`;
  } 
  else if (lowerQuery.includes('tüm') || lowerQuery.includes('bütün') || lowerQuery.includes('hepsi')) {
    files = [...mockFiles];
    response = `Toplam ${files.length} dosya bulunuyor. İşte tüm dosyalarınız:`;
  } 
  else if (lowerQuery.includes('son') || lowerQuery.includes('yeni')) {
    files = [...mockFiles].sort((a, b) => 
      new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime()
    ).slice(0, 5);
    response = "En son değiştirilen 5 dosyanız:";
  } 
  else if (lowerQuery.includes('büyük')) {
    files = [...mockFiles].sort((a, b) => b.size - a.size).slice(0, 5);
    response = "En büyük 5 dosyanız:";
  }
  else if (lowerQuery.includes('ssd') || lowerQuery.includes('depolama')) {
    response = "Telefonunuzda 8.76 GB kullanılmış durumda, toplam 53.65 GB depolama alanınız var. Yaklaşık %16 kullanım oranı ile depolama alanınız iyi durumda.";
  }
  else if (lowerQuery.includes('temizle') || lowerQuery.includes('junk') || lowerQuery.includes('çöp')) {
    response = "Gereksiz dosyaları taramak için Junk Cleaner özelliğini kullanabilirsiniz. Ana ekranda bulunan Junk Cleaner butonuna tıklayarak tarama başlatabilirsiniz.";
    action = 'junk_cleaner';
    actionData = {
      potentialSpace: 1.2, // GB
      categories: {
        cache: 0.8,
        temp: 0.3,
        duplicates: 0.1
      }
    };
  }
  else if (lowerQuery.includes('kategori')) {
    response = "Dosyalarınız şu kategorilere ayrılmış durumda: Fotoğraflar, Videolar, Müzik, Belgeler, İndirilenler ve APK dosyaları. Kategoriler sekmesinden tüm kategorileri görüntüleyebilirsiniz.";
  }
  else if (lowerQuery.includes('yardım') || lowerQuery.includes('ne yapabilir')) {
    response = "Size dosyalarınızı bulmak, kategorize etmek ve yönetmek konusunda yardımcı olabilirim. Örneğin 'fotoğraflarımı göster', 'en son belgelerimi bul', 'büyük dosyaları listele' gibi komutlar verebilirsiniz. Ayrıca 'selfie'lerimden kolaj yap' veya 'bu fotoğrafı düzenle' gibi daha karmaşık istekleri de yerine getirebilirim.";
  }
  else if (lowerQuery.includes('analiz') || lowerQuery.includes('analiz et')) {
    response = "Dosyalarınızı analiz ediyorum... Toplam 15 dosyanız var: 3 fotoğraf, 2 video, 5 belge, 2 ses dosyası ve 3 arşiv. En çok yer kaplayan dosya türü videolar (337 MB). Son 30 günde en çok belge türünde dosya eklemişsiniz.";
    action = 'analyze_storage';
    actionData = {
      totalFiles: 15,
      categories: {
        images: 3,
        videos: 2,
        documents: 5,
        audio: 2,
        archives: 3
      },
      largestCategory: 'videos',
      largestCategorySize: 337, // MB
      recentActivity: 'documents'
    };
  }
  else if (lowerQuery.includes('sıkıştır') || lowerQuery.includes('compress')) {
    if (files.length === 0) {
      // If no files selected yet, find some large files
      files = [...mockFiles]
        .filter(file => file.size > 5000000) // Files larger than 5MB
        .slice(0, 3);
    }
    
    if (files.length > 0) {
      response = `${files.length} dosyayı sıkıştırıyorum. Bu işlem dosya boyutlarını yaklaşık %40 oranında azaltacak.`;
      action = 'compress_files';
      actionData = {
        files: files,
        compressionRatio: 0.4,
        outputFormat: 'zip'
      };
    } else {
      response = "Sıkıştırmak için uygun dosya bulamadım. Lütfen sıkıştırmak istediğiniz dosyaları belirtin.";
    }
  }
  else if (lowerQuery.includes('yedekle') || lowerQuery.includes('backup')) {
    response = "Dosyalarınızı yedekleme işlemi başlatılıyor. Toplam 15 dosya (1.2 GB) bulut depolama alanınıza yedeklenecek. Bu işlem internet bağlantınıza bağlı olarak yaklaşık 10 dakika sürebilir.";
    action = 'backup_files';
    actionData = {
      totalFiles: 15,
      totalSize: 1.2, // GB
      destination: 'cloud',
      estimatedTime: 10 // minutes
    };
  }
  else {
    // Generic search
    files = mockFiles.filter(file => 
      file.name.toLowerCase().includes(lowerQuery) || 
      (file.category && file.category.toLowerCase().includes(lowerQuery))
    );
    
    if (files.length > 0) {
      response = `"${query}" aramanız için ${files.length} sonuç buldum:`;
    } else {
      response = `"${query}" için sonuç bulamadım. Farklı bir arama yapmak ister misiniz?`;
    }
  }

  return { response, files, action, actionData };
};