"""add img column to SavedBooks

Revision ID: acdaa7c4249c
Revises: 68919eb5cf59
Create Date: 2024-02-17 06:06:03.883098

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'acdaa7c4249c'
down_revision: Union[str, None] = '68919eb5cf59'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "saved_books", sa.Column("descriptions", sa.String(length=3000), nullable=True)
    ),
    op.add_column(
        "saved_books", sa.Column("images", sa.String(length=300), nullable=True)
    )


def downgrade() -> None:
    pass
