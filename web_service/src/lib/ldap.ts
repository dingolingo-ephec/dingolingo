import ldap from 'ldapjs';

// Définir les rôles
const ROLES = {
  STUDENT: 1,
  ADMIN: 2,
};

export const verifyLDAPCredentials = (username: string, password: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // 1. Mode simulation pour avancer sans l'AD des collègues
    if (process.env.NEXT_PUBLIC_MOCK_AUTH === "true") {
      if (username === "admin" && password === "admin") {
        return resolve({ 
          displayName: "Admin de Test", 
          mail: "admin@entreprise.be",
          isAdmin: true  // Flag pour identifier l'admin
        });
      }
      // Utilisateur test normal
      if (password === "test") {
        return resolve({ 
          displayName: username, 
          mail: `${username}@entreprise.be`,
          isAdmin: false
        });
      }
      return reject(new Error("Identifiants de test incorrects"));
    }

    // 2. Connexion réelle à l'AD
    const client = ldap.createClient({ url: process.env.LDAP_URL! });
    const userDN = `cn=${username},${process.env.LDAP_BASE_DN}`;

    client.bind(userDN, password, (err) => {
      if (err) {
        client.unbind();
        return reject(err);
      }
      
      client.search(userDN, { scope: 'base' }, (err, res) => {
        if (err) {
          client.unbind();
          return reject(err);
        }

        res.on('searchEntry', (entry) => {
          // Correction du type : on utilise .pojo ou on cast en any pour le build
          resolve((entry as any).object || (entry as any).pojo);
        });
        
        res.on('error', (err) => reject(err));
        res.on('end', () => client.unbind());
      });
    });
  });
};

// Exporter les rôles pour les utiliser ailleurs
export { ROLES };