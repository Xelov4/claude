import Image from 'next/image';

// Remplacer
<img src="/chemin/vers/image.jpg" alt="description" />

// Par
<Image 
  src="/chemin/vers/image.jpg" 
  alt="description"
  width={500} // Spécifier la largeur appropriée
  height={300} // Spécifier la hauteur appropriée
/> 