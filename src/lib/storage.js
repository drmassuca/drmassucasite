import { supabase } from './supabase';

const BUCKET_NAME = 'images';

/**
 * Faz upload de uma imagem para o Supabase Storage
 * @param {File} file - Arquivo de imagem
 * @param {string} folder - Pasta (ex: 'covers', 'content')
 * @returns {Promise<{url: string, path: string}>}
 */
export const uploadImage = async (file, folder = 'covers') => {
  // Validar tipo de arquivo
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Tipo de arquivo não permitido. Use JPG, PNG, WebP ou GIF.');
  }

  // Validar tamanho (máx 5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error('Arquivo muito grande. Máximo 5MB.');
  }

  // Gerar nome único
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const extension = file.name.split('.').pop().toLowerCase();
  const fileName = `${timestamp}-${randomId}.${extension}`;
  const filePath = `${folder}/${fileName}`;

  // Fazer upload
  const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    console.error('Erro no upload:', error);
    throw new Error('Falha ao fazer upload da imagem.');
  }

  // Obter URL pública
  const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return {
    url: urlData.publicUrl,
    path: filePath,
  };
};

/**
 * Exclui uma imagem do Supabase Storage
 * @param {string} path - Caminho do arquivo (ex: 'covers/123456.jpg')
 */
export const deleteImage = async path => {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

  if (error) {
    console.error('Erro ao excluir:', error);
    throw new Error('Falha ao excluir a imagem.');
  }
};

/**
 * Lista imagens de uma pasta
 * @param {string} folder - Pasta (ex: 'covers')
 * @returns {Promise<Array>}
 */
export const listImages = async (folder = '') => {
  const { data, error } = await supabase.storage.from(BUCKET_NAME).list(folder, {
    limit: 100,
    sortBy: { column: 'created_at', order: 'desc' },
  });

  if (error) {
    console.error('Erro ao listar:', error);
    throw new Error('Falha ao listar imagens.');
  }

  // Adicionar URLs públicas
  return data
    .filter(file => file.name !== '.emptyFolderPlaceholder')
    .map(file => {
      const filePath = folder ? `${folder}/${file.name}` : file.name;
      const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

      return {
        ...file,
        path: filePath,
        url: urlData.publicUrl,
      };
    });
};

/**
 * Extrai o path de uma URL do Supabase Storage
 * @param {string} url - URL completa
 * @returns {string|null} - Path ou null
 */
export const getPathFromUrl = url => {
  if (!url) return null;

  const match = url.match(/\/storage\/v1\/object\/public\/images\/(.+)$/);
  return match ? match[1] : null;
};
