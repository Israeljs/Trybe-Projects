SELECT
    nome AS nome_musica,
    CASE
        WHEN nome LIKE '%Streets' THEN REPLACE(nome, 'Streets', 'Code Review')
        WHEN nome LIKE '%Her Own' THEN REPLACE(nome, 'Her Own', 'Trybe')
        WHEN nome LIKE '%Inner Fire' THEN REPLACE(nome, 'Inner Fire', 'Project')
        WHEN nome LIKE '%Silly' THEN REPLACE(nome, 'Silly', 'Nice')
        WHEN nome LIKE '%Circus' THEN REPLACE(nome, 'Circus', 'Pull Request')
    END AS novo_nome
FROM
    SpotifyClone.cancoes
WHERE
    nome RLIKE 'Streets|Her Own|Inner Fire|Silly|Circus'
ORDER BY
    nome;

SELECT
    `name` AS `nome_musica`,
    CASE
        WHEN `name` LIKE '%Streets' THEN CONCAT(
            SUBSTRING(
                `name`,
                1,
                LOCATE('Streets', `name`) - 1
            ),
            'Code Review'
        )
        WHEN `name` LIKE '%Her Own' THEN CONCAT(
            SUBSTRING(
                `name`,
                1,
                LOCATE('Her Own', `name`) - 1
            ),
            'Trybe'
        )
        WHEN `name` LIKE '%Inner Fire' THEN CONCAT(
            SUBSTRING(
                `name`,
                1,
                LOCATE('Inner Fire', `name`) - 1
            ),
            'Project'
        )
        WHEN `name` LIKE '%Silly' THEN CONCAT(
            SUBSTRING(
                `name`,
                1,
                LOCATE('Silly', `name`) - 1
            ),
            'Nice'
        )
        WHEN `name` LIKE '%Circus' THEN CONCAT(
            SUBSTRING(
                `name`,
                1,
                LOCATE('Circus', `name`) - 1
            ),
            'Pull Request'
        )
    END AS `novo_nome`
FROM
    SpotifyClone.`Songs`
HAVING
    `novo_nome` IS NOT NULL
ORDER BY
    `nome_musica` ASC;