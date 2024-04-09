"""Add bookID column to SavedBooks

Revision ID: 4dd54d37126b
Revises: 89685529e03d
Create Date: 2024-02-17 02:43:27.309553

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '4dd54d37126b'
down_revision: Union[str, None] = '89685529e03d'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "saved_books", sa.Column("book_id", sa.String(length=100), nullable=True)
    )


def downgrade() -> None:
    # op.drop_column("saved_books", "book_id")
    pass
