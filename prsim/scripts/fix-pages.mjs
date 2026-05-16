import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const head = (title, desc) => `<!DOCTYPE html>
<html lang="fr" data-theme="">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${desc}">
  <title>${title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <a href="#main" class="skip-link">Aller au contenu</a>`;

function nav(active) {
  const cls = (p) => `nav__link${active === p ? ' is-active' : ''}${p === 'contact' ? ' nav__link--cta' : ''}`;
  return `
  <header class="site-header" role="banner">
    <nav class="nav" aria-label="Navigation principale">
      <div class="nav__inner">
        <a href="index.html" class="nav__logo"><span class="nav__logo-mark">◇</span> PRSIM</a>
        <ul class="nav__links" role="list">
          <li><a href="index.html" class="${cls('index')}" data-page="index.html">Accueil</a></li>
          <li><a href="services.html" class="${cls('services')}" data-page="services.html">Services</a></li>
          <li><a href="equipe.html" class="${cls('equipe')}" data-page="equipe.html">Équipe</a></li>
          <li><a href="contact.html" class="${cls('contact')}" data-page="contact.html">Contact</a></li>
        </ul>
        <div class="nav__controls">
          <div class="theme-switcher theme-switcher--desktop" role="group" aria-label="Thème">
            <button class="theme-btn theme-btn--violet is-active" data-theme="violet" aria-pressed="true"></button>
            <button class="theme-btn theme-btn--cyan" data-theme="cyan" aria-pressed="false"></button>
            <button class="theme-btn theme-btn--rose" data-theme="rose" aria-pressed="false"></button>
          </div>
          <button class="nav__burger" aria-label="Menu" aria-expanded="false" aria-controls="nav-mobile">
            <span class="burger-bar"></span><span class="burger-bar"></span><span class="burger-bar"></span>
          </button>
        </div>
      </div>
      <div class="nav__mobile" id="nav-mobile" aria-hidden="true">
        <a href="index.html" class="nav__link">Accueil</a>
        <a href="services.html" class="nav__link">Services</a>
        <a href="equipe.html" class="nav__link">Équipe</a>
        <a href="contact.html" class="nav__link">Contact</a>
        <div class="theme-switcher theme-switcher--mobile" role="group" aria-label="Thème">
          <button class="theme-btn theme-btn--violet is-active" data-theme="violet"></button>
          <button class="theme-btn theme-btn--cyan" data-theme="cyan"></button>
          <button class="theme-btn theme-btn--rose" data-theme="rose"></button>
        </div>
      </div>
    </nav>
  </header>`;
}

const footer = `
  <footer class="footer" role="contentinfo">
    <div class="container footer__inner">
      <a href="index.html" class="nav__logo"><span class="nav__logo-mark">◇</span> PRSIM</a>
      <nav class="footer__links" aria-label="Pied de page">
        <a href="services.html">Services</a>
        <a href="equipe.html">Équipe</a>
        <a href="contact.html">Contact</a>
        <a href="mailto:Prism.contact.pro@proton.me">Prism.contact.pro@proton.me</a>
      </nav>
      <p class="footer__copy mono">© <span data-year></span> PRSIM. Tous droits réservés.</p>
    </div>
  </footer>
  <script src="js/main.js"></script>
</body>
</html>`;

function build(title, desc, active, main) {
  return head(title, desc) + nav(active) + `\n  <main id="main">\n${main}\n  </main>` + footer;
}

function save(file, html) {
  fs.writeFileSync(path.join(root, file), html.replaceAll('div', 'div'), 'utf8');
}

save('index.html', build(
  'PRSIM — Agence de développement',
  'PRSIM — Sites livrés en 2 semaines max. Gwentahl Guignard & Aronne Fanzini.',
  'index',
  `
    <section class="page-hero" aria-label="Accueil">
      <div class="hero__grid-bg" aria-hidden="true"></div>
      <div class="hero__orb hero__orb--1" aria-hidden="true"></div>
      <div class="hero__orb hero__orb--2" aria-hidden="true"></div>
      <div class="container">
        <div class="hero__content">
          <p class="hero__badge mono reveal">
            <span class="hero__badge-dot" aria-hidden="true"></span>
            Agence web · Gwentahl & Aronne · Sites en 2 semaines max
          </p>
          <h1 class="hero__title reveal">
            Votre site.<br>
            <em class="gradient-text">Prêt</em> à convaincre.
          </h1>
          <p class="hero__desc reveal">
            PRSIM, c’est l’agence de Gwentahl Guignard et Aronne Fanzini — deux jeunes de 15 ans qui créent des sites
            et applications beaux, clairs et efficaces. Votre site web est terminé en 2 semaines maximum.
          </p>
          <div class="hero__actions reveal">
            <a href="contact.html" class="btn btn--primary">Demander un devis gratuit</a>
            <a href="equipe.html" class="btn btn--ghost">Rencontrer l’équipe</a>
          </div>
          <div class="hero__stats reveal">
            <div class="stat-card glass">
              <strong>2 sem.</strong>
              <span>Site web livré</span>
            </div>
            <div class="stat-card glass">
              <strong>48 h</strong>
              <span>Pour vous répondre</span>
            </div>
            <div class="stat-card glass">
              <strong>2</strong>
              <span>Personnes à votre écoute</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="why-title">
      <div class="container">
        <p class="section__label mono reveal">// Pourquoi PRSIM</p>
        <h2 id="why-title" class="section__title reveal">Simple, rapide,<br><em class="gradient-text">pro</em>.</h2>
        <p class="section__desc reveal">
          Pas de mots compliqués : on vous explique tout clairement, on avance avec vous,
          et on livre un résultat dont vous êtes fiers devant vos clients.
        </p>
        <div class="cards-grid">
          <article class="card glass reveal">
            <div class="card__icon">⚡</div>
            <h3 class="card__title">2 semaines max</h3>
            <p class="card__text">Pour un site web, on s’engage sur un délai court. Vous savez quand vous serez en ligne.</p>
          </article>
          <article class="card glass reveal">
            <div class="card__icon">✦</div>
            <h3 class="card__title">Un look qui marque</h3>
            <p class="card__text">Design moderne et soigné — vos visiteurs retiennent votre marque.</p>
          </article>
          <article class="card glass reveal">
            <div class="card__icon">🎯</div>
            <h3 class="card__title">Pensé pour vos clients</h3>
            <p class="card__text">Pages claires, contact facile, site fluide sur téléphone et ordinateur.</p>
          </article>
          <article class="card glass reveal">
            <div class="card__icon">🤝</div>
            <h3 class="card__title">Toujours joignables</h3>
            <p class="card__text">Gwentahl et Aronne vous accompagnent du début à la mise en ligne.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="offer-title">
      <div class="container">
        <p class="section__label mono reveal">// Ce qu’on fait</p>
        <h2 id="offer-title" class="section__title reveal">Nos spécialités</h2>
        <div class="cards-grid">
          <article class="card glass reveal"><h3 class="card__title">Sites vitrine</h3><p class="card__text">Présenter votre activité et un moyen simple de vous contacter.</p></article>
          <article class="card glass reveal"><h3 class="card__title">Boutiques en ligne</h3><p class="card__text">Vendre vos produits avec un parcours d’achat fluide.</p></article>
          <article class="card glass reveal"><h3 class="card__title">Applications</h3><p class="card__text">Outils sur mesure pour votre équipe ou vos clients.</p></article>
          <article class="card glass reveal"><h3 class="card__title">Projets originaux</h3><p class="card__text">Jeux ou expériences pour vous démarquer (sur devis).</p></article>
        </div>
        <p class="reveal" style="margin-top:32px;text-align:center">
          <a href="services.html" class="btn btn--ghost">Voir tous les services →</a>
        </p>
      </div>
    </section>

    <section class="container">
      <div></div>
      <div class="cta-band glass reveal">
        <h2>Un projet en tête ?</h2>
        <p>Devis gratuit, sans engagement. Décrivez votre idée — on revient vers vous sous 48 h.</p>
        <a href="contact.html" class="btn btn--primary">Demander un devis gratuit</a>
      </div>
    </section>`
));

save('equipe.html', build(
  'Équipe — PRSIM',
  "Gwentahl Guignard et Aronne Fanzini, fondateurs de l'agence PRSIM.",
  'equipe',
  `
    <header class="page-header">
      <div class="container">
        <p class="section__label mono reveal">// Équipe</p>
        <h1 class="section__title reveal">Gwentahl & Aronne.<br>Une seule <em class="gradient-text">équipe</em>.</h1>
        <p class="section__desc reveal">
          On a 15 ans et on a créé PRSIM ensemble : Gwentahl structure l'offre et vos idées,
          Aronne transforme tout ça en site ou application — livré en 2 semaines maximum pour un site web.
        </p>
      </div>
    </header>
    <section class="section" style="padding-top:0">
      <div class="container team-grid">
        <article class="team-member glass reveal">
          <div class="team-member__avatar" aria-hidden="true">G</div>
          <p class="team-member__role mono">Co-fondateur · Commercial & idées</p>
          <h2 class="team-member__name">Gwentahl Guignard</h2>
          <p class="team-member__bio">
            C'est lui qui vous écoute en premier : il comprend votre activité, pose les bonnes questions
            et transforme votre vision en plan clair pour le projet.
          </p>
        </article>
        <article class="team-member glass reveal">
          <div class="team-member__avatar" aria-hidden="true">A</div>
          <p class="team-member__role mono">Co-fondateur · Développeur</p>
          <h2 class="team-member__name">Aronne Fanzini</h2>
          <p class="team-member__bio">
            Il construit le site ou l'application et s'occupe de la mise en ligne.
            Vous recevez un résultat propre, rapide et prêt à montrer à vos clients.
          </p>
        </article>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <p class="section__label mono reveal">// Nos valeurs</p>
        <h2 class="section__title reveal">Ce qui nous définit</h2>
        <div class="cards-grid">
          <article class="card glass reveal"><h3 class="card__title">Transparence</h3><p class="card__text">Prix clairs, délais réalistes, pas de promesses impossibles.</p></article>
          <article class="card glass reveal"><h3 class="card__title">Passion</h3><p class="card__text">On adore ce qu'on fait — votre projet en profite à chaque étape.</p></article>
          <article class="card glass reveal"><h3 class="card__title">Exigence</h3><p class="card__text">Chaque détail compte. On ne livre pas un site à moitié fini.</p></article>
        </div>
      </div>
    </section>
    <section class="container">
      <div class="cta-band glass reveal">
        <h2>Envie de travailler avec nous ?</h2>
        <p>Devis gratuit — décrivez votre projet, on vous répond sous 48 h.</p>
        <a href="contact.html" class="btn btn--primary">Nous écrire</a>
      </div>
    </section>`
));

save('contact.html', build(
  'Contact — PRSIM',
  'Contactez PRSIM — devis gratuit, réponse sous 48 h.',
  'contact',
  `
    <header class="page-header">
      <div class="container">
        <p class="section__label mono reveal">// Contact</p>
        <h1 class="section__title reveal">Parlons de<br>votre <em class="gradient-text">projet</em></h1>
        <p class="section__desc reveal">Décrivez votre projet en quelques lignes — on vous répond sous 48 h avec un devis gratuit.</p>
      </div>
    </header>
    <section class="section" style="padding-top:0">
      <div class="container contact-layout">
        <div class="contact__info">
          <dl class="contact__details reveal">
            <div class="contact__detail"><dt class="mono">Email</dt><dd><a href="mailto:Prism.contact.pro@proton.me">Prism.contact.pro@proton.me</a></dd></div>
            <div></div>
            <div></div>
            <div class="contact__detail"><dt class="mono">Réponse</dt><dd>Sous 48 h</dd></div>
            <div class="contact__detail"><dt class="mono">Délai site web</dt><dd>2 semaines maximum</dd></div>
            <div class="contact__detail"><dt class="mono">Disponibilité</dt><dd><span class="hero__badge-dot" style="display:inline-block;vertical-align:middle;margin-right:8px"></span> Ouverts aux nouveaux projets</dd></div>
          </dl>
          <p class="reveal" style="color:var(--text-muted);font-size:0.95rem">Discord, Instagram ou email — indiquez comment vous joindre dans le message.</p>
        </div>
        <div class="contact__form-wrap reveal">
          <form class="contact-form glass" id="contact-form" method="POST" novalidate aria-label="Formulaire de contact">
            <input type="hidden" name="_subject" value="Nouveau message — PRSIM">
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_template" value="table">
            <input type="hidden" name="_next" value="contact.html?sent=1">
            <input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">
            <div class="form-row">
              <div class="form-group">
                <label for="f-name" class="form-label mono">Nom *</label>
                <input type="text" id="f-name" name="name" class="form-input" required autocomplete="name" placeholder="Votre nom">
                <span class="form-error" id="err-name" role="alert"></span>
              </div>
              <div class="form-group">
                <label for="f-email" class="form-label mono">Email *</label>
                <input type="email" id="f-email" name="email" class="form-input" required autocomplete="email" placeholder="vous@exemple.fr">
                <span class="form-error" id="err-email" role="alert"></span>
              </div>
            </div>
            <div class="form-group">
              <label for="f-company" class="form-label mono">Entreprise / projet</label>
              <input type="text" id="f-company" name="company" class="form-input" placeholder="Optionnel">
            </div>
            <div class="form-group">
              <label for="f-message" class="form-label mono">Votre message *</label>
              <textarea id="f-message" name="message" class="form-input form-textarea" required rows="5" placeholder="Parlez-nous de votre activité, ce que vous voulez sur le site…"></textarea>
              <span class="form-error" id="err-message" role="alert"></span>
            </div>
            <button type="submit" class="btn btn--primary btn--full">Envoyer →</button>
            <div class="form-success" id="form-success" role="alert" hidden>Message envoyé ! On vous répond très vite par email.</div>
            <p class="form-note mono">* Champs obligatoires</p>
          </form>
        </div>
      </div>
    </section>`
));

save('services.html', build(
  'Services — PRSIM',
  'Sites web livrés en 2 semaines, applications et plus — PRSIM.',
  'services',
  `
    <header class="page-header">
      <div class="container">
        <p class="section__label mono reveal">// Services</p>
        <h1 class="section__title reveal">Ce qu'on fait<br>pour <em class="gradient-text">vous</em></h1>
        <p class="section__desc reveal">Des sites clairs et efficaces — livrés vite, expliqués simplement.</p>
      </div>
    </header>
    <section class="section" style="padding-top:0">
      <div class="container cards-grid">
        <article class="card glass reveal">
          <div class="card__icon">🌐</div>
          <h2 class="card__title">Site vitrine</h2>
          <p class="card__text">Présenter votre activité, vos photos, vos services et un formulaire de contact.</p>
          <p class="mono" style="margin-top:16px;color:var(--accent)">Livré en 2 semaines max</p>
        </article>
        <article class="card glass reveal">
          <div class="card__icon">🛒</div>
          <h2 class="card__title">Boutique en ligne</h2>
          <p class="card__text">Vendre vos produits avec un site simple à utiliser pour vous et vos clients.</p>
          <p class="mono" style="margin-top:16px;color:var(--accent)">Sur devis</p>
        </article>
        <article class="card glass reveal">
          <div class="card__icon">📱</div>
          <h2 class="card__title">Application</h2>
          <p class="card__text">Un outil sur mesure : réservation, espace membre, tableau de bord…</p>
          <p class="mono" style="margin-top:16px;color:var(--accent)">Sur devis</p>
        </article>
        <article class="card glass reveal">
          <div class="card__icon">🎨</div>
          <h2 class="card__title">Identité visuelle</h2>
          <p class="card__text">Logo, couleurs, style du site — une image cohérente pour votre marque.</p>
          <p class="mono" style="margin-top:16px;color:var(--accent)">Pack créatif</p>
        </article>
        <article class="card glass reveal">
          <div class="card__icon">🛠</div>
          <h2 class="card__title">Mises à jour</h2>
          <p class="card__text">Modifications, corrections, nouvelles pages après la livraison.</p>
          <p class="mono" style="margin-top:16px;color:var(--accent)">Forfait mensuel</p>
        </article>
        <article class="card glass reveal">
          <div class="card__icon">🎮</div>
          <h2 class="card__title">Projets spéciaux</h2>
          <p class="card__text">Jeu, expérience interactive ou projet original — on en discute ensemble.</p>
          <p class="mono" style="margin-top:16px;color:var(--accent)">Sur devis</p>
        </article>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <p class="section__label mono reveal">// Comment ça se passe</p>
        <h2 class="section__title reveal">En 4 étapes</h2>
        <div class="process-list">
          <div class="process-step reveal"><span class="process-step__num">01</span><div><h3>Échange avec Gwentahl</h3><p>Il comprend votre activité et ce que vous voulez obtenir avec le site.</p></div></div>
          <div class="process-step reveal"><span class="process-step__num">02</span><div><h3>Aperçu du design</h3><p>Vous validez le look avant qu'Aronne construise le site.</p></div></div>
          <div class="process-step reveal"><span class="process-step__num">03</span><div><h3>Création par Aronne</h3><p>Construction du site, avec des nouvelles à vous régulièrement.</p></div></div>
          <div class="process-step reveal"><span class="process-step__num">04</span><div><h3>Mise en ligne</h3><p>Votre site est en ligne — prêt à accueillir vos clients.</p></div></div>
        </div>
      </div>
    </section>
    <section class="container">
      <div class="cta-band glass reveal">
        <h2>Un projet en tête ?</h2>
        <p>Devis gratuit — on vous répond sous 48 h.</p>
        <a href="contact.html" class="btn btn--primary">Nous contacter</a>
      </div>
    </section>`
));

console.log('All pages written.');
