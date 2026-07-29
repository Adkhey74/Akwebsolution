import { ProjectBand } from "@/components/ProjectBand";
import { projects } from "@/lib/projects";

/**
 * Listing de la page /projets — mêmes bandes alternées plein cadre que la
 * section « Réalisations » de l'accueil (ProjectsPreview), mais avec tous les
 * projets plutôt que les 3 premiers : les deux pages doivent présenter les
 * réalisations avec le même langage visuel, pas deux styles différents.
 *
 * Pas de `.section-container` ici : chaque ProjectBand porte déjà le sien,
 * nécessaire à son visuel qui déborde jusqu'au bord du viewport (bleed-*) —
 * l'imbriquer une seconde fois doublerait le padding horizontal.
 *
 * `mediaFirst` inversé par rapport à ProjectsPreview : le H1 de ProjetsHeader
 * est aligné à gauche juste au-dessus, donc le texte du premier projet doit
 * lui aussi démarrer à gauche (image à droite), sinon le zigzag de
 * l'alternance surprend dès la première bande.
 */
export function ProjetsList() {
  return (
    <div className="flex flex-col gap-20 pb-20 md:gap-28 md:pb-28 lg:gap-32 lg:pb-32">
      {projects.map((project, i) => (
        <ProjectBand key={project.slug} project={project} index={i} mediaFirst={i % 2 === 1} />
      ))}
    </div>
  );
}
