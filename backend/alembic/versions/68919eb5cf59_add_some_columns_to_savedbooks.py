"""Add some columns to SavedBooks

Revision ID: 68919eb5cf59
Revises: 4dd54d37126b
Create Date: 2024-02-17 03:59:20.363288

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '68919eb5cf59'
down_revision: Union[str, None] = '4dd54d37126b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.add_column(
        "saved_books", sa.Column("bookID", sa.String(length=100), nullable=True)
    ),


def downgrade() -> None:
    # op.drop_column("saved_books", "bookID")
    pass
