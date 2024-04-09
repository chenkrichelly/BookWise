"""Add a description and image to SavedBooks

Revision ID: 89685529e03d
Revises: 74f982df3eef
Create Date: 2024-02-13 18:19:25.855353

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '89685529e03d'
down_revision: Union[str, None] = '74f982df3eef'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.add_column(
        "saved_books", sa.Column("description", sa.String(length=3000), nullable=True)
    ),
    op.add_column(
        "saved_books", sa.Column("image", sa.String(length=300), nullable=True)
    )


def downgrade() -> None:
    op.drop_column("saved_books", "description"),
    op.drop_column("saved_books", "image")
